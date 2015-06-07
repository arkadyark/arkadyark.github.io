require 'json'
require 'rapgenius'
require 'pry'

def get_collabs(root_artist, already_seen, explored, queue, all_collaborations)
    # Initialize variables to keep track of
    artist_info = {} # artist name => {name => artist name, image_url => <>}
    collabs = {} # artists => {co-artist => number of co-appearances}

    # Add the root artist to the list of already seen people
    root_name = root_artist.name
    # So we don't look at the same artist twice
    already_seen.push(root_name)

    page_number = 1
    all_songs = []
    # Get all of the songs for the artist, page by page
    while true do
        songs = root_artist.songs(page: page_number)
        # On the last page, we get back no songs
        if (songs.length == 0) then break end
        # Add the songs on this page
        all_songs += songs
        # Move on to the next page
       page_number += 1
    end
    # Filter out unimportant guys
    if (all_songs.length < 40) then return end
    # High threshold for artists, get rid of some of the noise
    if (page_number < 8) then return end
    # Important artist!
    puts "Pages of songs: " + String(page_number)
    # Store artist info
    artist_info["name"] = root_name
    artist_info["image"] = root_artist.image
    explored.push(artist_info)
    all_collaborations[root_name] = collabs
    names_in_queue = queue.map {|future_artist| future_artist.name}
    # Go through each song, looking for collaborations
    all_songs.each do |song|
        # Problems may come up retrieving these, if so keep going
        begin
            artists = song.artists
            pyongs = song.pyongs
        rescue
            artists = []
            pyongs = 0
        end
        # Only look at 'popular' songs
        if (pyongs && pyongs > 2 && artists.length > 1 and (not song.title.include? "Interview") and (not song.title.include? "Tour Dates") and (not song.title.include? "Remix"))
            artist_names = artists.map {|k| k.name}
            # Filter out vetoed guys
            if ((not artist_names.include? "Producer Genius") and (not artist_names.include? "Rap Genius"))
                # Go through each artist on the song
                if (artist_names.include? root_name)
                    artists.each do |artist|
                        name = artist.name
                        # Make sure we haven't seen them already
                        # Make sure we don't plan to look at them
                        if (not already_seen.include? name and (not names_in_queue.include? name))
                            # If its a different artist
                            if (name != root_name)
                                # Add their collaboration
                                if (collabs[name])
                                    collabs[name]["number"] += 1
                                    collabs[name]["songs"].push(song.title)
                                else
                                    collabs[name] = {}
                                    collabs[name]["number"] = 1
                                    collabs[name]["songs"] = [song.title]
                                    queue.push(name)
                                end
                            end
                        end
                    end
                end
            end
        end
    end
end

def make_JSON(artists, all_collaborations)
    # Helper function to return d3.js convenient formatted JSON
    artist_names = artists.map {|node| node["name"]}
    links = []

    # Add a link for each collaboration, after nodes have been populated
    all_collaborations.keys.each do |first_artist|
        collaborations = all_collaborations[first_artist]
        collaborations.each do |collaborator, stats|
            if (artist_names.index(first_artist) and artist_names.index(collaborator))
                links.push({"source" => artist_names.index(first_artist),
                            "target" => artist_names.index(collaborator),
                            "value" => stats["number"],
                            "songs" => stats["songs"]
                })
            end
        end
    end

    # Return the json
    JSON.generate({"nodes" => artists, "links" => links})
end

# Initialize starting point (All Day/Kanye)
song = RapGenius::Song.find(482233)
queue = [song.artist]

already_seen = ["Rap Genius", "Rock Genius", "Pop Genius", "Fashion Genius", "Producer Genius", "Sports Genius", "Billboard", "XXL Magazine", "Rolling Stone"] # Keep track of every artist we've seen so far
# Also used as an initial veto list
explored = [] # Keep track of every artist we've gotten collaborations for
all_collaborations = {} # Keep track of all of the collaborations

# Main loop, crawl through artists
while (queue.length > 0 and explored.length < 500) do
    # Get the next artist to focus on
    artist = queue.shift()

    puts "Artists already seen: " + String(already_seen.length)
    puts "Artists already explored: " + String(explored.length)
    puts "Artists on the queue: " + String(queue.length)
    puts "Currently looking at " + artist.name

    # Get collaborations for that artist
    get_collabs(artist, already_seen, explored, queue, all_collaborations)

    open('network_medium_threshold_no_producers.json', 'w') {|f|
        f.puts make_JSON(explored, all_collaborations)
    }
    puts
end

puts make_JSON(explored, all_collaborations)

require 'json'
require 'rapgenius'
require 'pry'

def make_JSON(artists, all_collaborations)
    # Helper function to return d3.js convenient formatted JSON
    artist_names = artists.map {|node| node["name"]}
    links = []

    # Add a link for each collaboration
    all_collaborations.keys.each do |first_artist|
        collaborations = all_collaborations[first_artist]
        collaborations.each do |collaborator, stats|
            links.push({"source" => artist_names.index(first_artist),
                        "target" => artist_names.index(collaborator),
                        "value" => stats["number"],
                        "songs" => stats["songs"]
            })
        end
    end

    # Return the json
    JSON.generate({"nodes" => artists, "links" => links})
end

$all_artists = ["Kanye West", "Jay Z", "Kendrick Lamar", "Diddy", "Drake", "Lil Wayne", "Big Sean", "Jeezy", "Pusha T", "J. Cole", "Common", "2 Chainz", "Nicki Minaj", "A$AP Ferg", "Tyler, The Creator", "Ludacris", "Talib Kweli", "Cam'ron", "Nas", "KRS-ONE", "RZA", "T.I.", "Rick Ross", "Lupe Fiasco", "Yasiin Bey", "Eminem", "Raekwon", "Scarface", "Busta Rhymes", "Chief Keef", "E-40", "Jadakiss", "Future", "Ol' Dirty Bastard", "Frank Ocean", "Ghostface Killah", "Twista", "Pete Rock", "Wale", "Ty Dolla $ign", "Dr. Dre", "The Notorious B.I.G.", "Ja Rule", "Outkast", "Killer Mike", "DMX", "50 Cent", "Meek Mill", "Lil Kim", "Kurupt", "YG", "Nipsey Hu$$le", "Birdman", "ScHoolboy Q", "Wiz Khalifa", "2Pac", "Young Thug", "Juicy J", "Master P", "Boosie Badazz", "Rich Homie Quan", "A$AP Rocky", "Royce Da 5'9\"", "Yelawolf", "Big KRIT", "Danny Brown", "Action Bronson", "Joey BADA$$", "Ab-Soul", "Ace Hood", "Jay Rock", "Tech N9ne", "B.o.B", "Mac Miller", "Snoop Dogg", "Childish Gambino", "Curren$y", "Murs", "The Roots", "Gucci Mane", "Logic", "Fat Joe", "LL Cool J", "Nelly", "Bone Thugs-n-Harmony", "Waka Flocka Flame", "Trey Songz", "Mystikal", "Bun B", "Soulja Boy", "Krizz Kaliko", "Lil B", "Wyclef Jean", "Chance The Rapper", "Kevin Gates", "Hodgy Beats", "Asher Roth", "Ice Cube", "Nate Dogg", "El-P", "AZ", "Mobb Deep", "De La Soul", "Beastie Boys", "Xzibit", "Kool G. Rap", "Inspectah Deck", "MC Guru", "Freddie Gibbs", "Killah Priest", "Method Man", "MF DOOM", "Cappadonna", "RiFF RAFF", "Masta Ace", "Krayzie Bone", "Brother Ali", "Redman", "Outlawz", "Ice-T", "Three 6 Mafia", "Ras Kass", "Aesop Rock", "Cunninlynguists", "Prince Paul", "Erick Sermon", "E.P.M.D.", "Atmosphere", "Rakim", "A Tribe Called Quest", "Run-D.M.C.", "Eyedea", "Cannibal Ox", "UGK", "Pimp C", "GZA", "Kool Keith", "Das EFX", "Gang Starr", "Goodie Mob", "Cypress Hill", "Clipse", "Biz Markie", "Jungle Brothers", "Jay Electronica", "Jeru the Damaja", "Canibus", "Earl Sweatshirt", "U-God", "Masta Killa", "Eazy-E", "Big L", "Lauryn Hill", "Big Punisher", "Slick Rick", "Public Enemy", "Chuck D", "Big Boi", "Andre 3000", "Black Thought", "The Underachievers", "Flatbush Zombies", "Capital STEEZ", "CJ Fly", "Casey Veggies", "Big Daddy Kane", "Immortal Technique", "Pharoahe Monch", "MC Lyte", "Kool Moe Dee", "Queen Latifah", "Beanie Sigel", "Domo Genesis", "Game", "Rae Sremmurd", "Jedi Mind Tricks"]

def get_artist_object(artist_name)
    songs = RapGenius.search_by_artist(artist_name)
    artist = songs[0].artists[0]
    i = 0

    ## Special cases
    if (artist_name == 'Game')
        # Annoying special case to fix, stupid Game Genius
        return RapGenius.search_by_title("Hate It or Love it")[0].artists[0]
    end

    if (artist_name == 'Rakim')
        # Annoying special case to fix, stupid A$AP
        return RapGenius.search_by_title("My Melody")[0].artists[0]
    end

    ## Normal case
    while (artist.name != artist_name)
        song = songs[i]
        for potential_artist in song.artists
            if (potential_artist.name == artist_name)
                artist = potential_artist
                break
            end
        end
        i += 1
    end

    artist
end

def get_all_songs(artist)
    # Get all of the songs associated with an artist
    page_number = 1
    all_songs = []
    while true do
        songs = artist.songs(page: page_number)
        if (songs.length == 0) then break end
        all_songs += songs
        page_number += 1
    end
    all_songs
end

def check_song(song, artist_name)
    # Check if the song is 'valid'
    title = song.title.downcase
    if (title.include? "tour dates") then return false end
    if (title.include? "speech") then return false end
    if (title.include? "demo") then return false end
    if (title.include? "interview") then return false end
    if (title.include? "remix") then return false end
    if (title.include? "rmx") then return false end
    if (title.include? "credits") then return false end
    if (title.include? "new version") then return false end
    if (title.include? "extended version") then return false end
    if (title.include? "single art") then return false end
    if (title.include? "album art") then return false end
    if (title.include? "track list") then return false end
    if (title.include? "tracklist") then return false end
    if (title.include? "mashup") then return false end
    if (title.include? "mix)") then return false end
    if (title.include? "commercial") then return false end
    if (title.include? "(live") then return false end

    # Contemplating...
    #if (title.include? "freestyle") then return false end
    #if (title.include? "cypher") then return false end

    # Funny trick to ignore producers
    artist_names =  (song.artists.map {|k| k.name})
    if (not artist_names.include? artist_name) then return false end
    if (not $all_artists.include? song.artist.name) then return false end
    return true
end

collabs = {}
artist_info = []

for artist_name in $all_artists
    collabs[artist_name] = {}
    # Get the artist object from the string name
    puts 'Working on ' + artist_name
    artist = get_artist_object(artist_name)
    
    # Get all of the artist's songs
    all_songs = get_all_songs(artist)
    puts 'Number of songs: ' + String(all_songs.length)

    # Add the artist's image
    artist_info.push({"name" => artist_name, "image" => artist.image})

    # Go through each song looking at features
    for song in all_songs
        if (check_song(song, artist_name))
            #binding.pry
            song_artists = song.artists
            for coartist in song_artists
                # Don't double count
                if (!collabs.keys.include? coartist.name)
                    # No self collabs
                    if (coartist.name != artist_name && ($all_artists.include? coartist.name))
                        puts artist_name + ' and ' + coartist.name + ' collaborated on ' + song.title
                        # Add features
                        if (collabs[artist_name][coartist.name])
                            collabs[artist_name][coartist.name]["number"] += 1
                            collabs[artist_name][coartist.name]["songs"].push(song.title)
                        else
                            collabs[artist_name][coartist.name] = {}
                            collabs[artist_name][coartist.name]["number"] = 1
                            collabs[artist_name][coartist.name]["songs"] = [song.title] 
                        end
                    end
                end
            end
        end
    end

    # Write to JSON file
    open('network_handpicked.json', 'w') {|f|
        f.puts make_JSON(artist_info, collabs)
    }
end

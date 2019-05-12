const axios = require('axios');

async function search (text_to_search, message_list) {
    //Takes two inputs, a string and a list of messages from the forum
    //returns a ordered list of only the messages that matches

    text_to_search = text_to_search.split(' ');
    var synonym_list = [];

    for (var a = 0; a < text_to_search.length; a++) {
        //get all synonyms and words with similar meaning to the user input
        var synonyms = await axios.get('https://api.datamuse.com/words?ml=' + encodeURI(text_to_search[a]));
        synonym_list = synonym_list.concat(synonyms.data);
    }


    for (var message_index = 0; message_index < message_list.length; message_index++) {
        //loops through all messages
        message_list[message_index].point = 0;
        //set the default value as 0 matches
        for (var text_index = 0; text_index < text_to_search.length; text_index++) {
            //loops through all exact words of the user input
            var regex = new RegExp(text_to_search[text_index], 'i');
            var result_title = message_list[message_index].title.match(regex);
            var result_message = message_list[message_index].message.match(regex);
            if (result_title || result_message) {
                //add a match
                message_list[message_index].point++
            }
        }
        for (var synonym_index = 0; synonym_index < synonym_list.length; synonym_index++) {
            //loops through all synonyms and similar words
            var regex_syn = new RegExp(synonym_list[synonym_index].word, 'i');
            var result_title_syn = message_list[message_index].title.match(regex_syn);
            var result_message_syn = message_list[message_index].message.match(regex_syn);
            if (result_title_syn || result_message_syn) {
                //add a match
                message_list[message_index].point++;
            }
        }
    }

    var filtered_list = [];

    for (var i = 0; i < message_list.length; i++) {
        //loops through all messages and get the ones who had more than 0 matches
        if (message_list[i].point !== 0) {
            filtered_list.push(message_list[i])
        }
    }

    filtered_list.sort((a, b) => (a.point < b.point) ? 1 : -1);
    //sort the list by the number of matches

    return filtered_list
}

module.exports = {
    search
};
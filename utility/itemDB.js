var Item = require('../models/Item');
// Hard coded data

var data = [
    {
        itemCode: "Bk01",
        itemName: "Stephen Hawking -A life in Science",
        catalogCategory: "Sci-Fi & Fantasy",
        description: "In Stephen Hawking, science writers White and Gribbin have painted a compelling portrait of a scientific mind that seemingly knows no bounds. Weaving together clear explanations of Hawking’s science with a detailed, balanced, and sensitive personal history, readers will come to know and appreciate both sides of this incredible man.",
        rating: 5,
        imgUrl: "../../assets/images/Science.jpg",

    },
    {
        itemCode: "Bk02",
        itemName: "The Ragged Edge of Night",
        catalogCategory: "Sci-Fi & Fantasy",
        description: "Germany, 1942. Franciscan friar Anton Starzmann is stripped of his place in the world when his school is seized by the Nazis. He relocates to a small German hamlet to wed Elisabeth Herter.But when the SS discovers his schemes, Anton will embark on a final act of defiance that may cost him his life even if it means saying goodbye to the family he has come to love more than he ever believed.",
        rating: 4,
        imgUrl: "../../assets/images/reon.jpg",
    },
    {
        itemCode: "Bk03",
        itemName: "The Paris Secret",
        catalogCategory: "Sci-Fi & Fantasy",
        description: "An epic and heartbreaking love story set in World War Two .The last time Valerie was in Paris, she was three years old, running from the Nazis, away from the only home she had ever known,her grandfather Vincent, the only person who knows the truth about what happened to her parents.",
        rating: 3,
        imgUrl: "../../assets/images/tps.jpg",
    },
    {
        itemCode: "Bk04",
        itemName: "Zero Sugar CookBook",
        catalogCategory: "Health & Fitness",
        description: "Lose up to a pound a day with more than 100 mouthwatering recipes for sugar-free meals, drinks, snacks, and desserts, based on the cravings-busting, fat-melting science from Zero Sugar Diet.With Zero Sugar Diet, #1 New York Times bestselling author David Zinczenko continued his twenty-year mission to help Americans live their happiest and healthiest lives.",
        rating: 4,
        imgUrl: "../../assets/images/zsc.jpg",
    },

    {
        itemCode: "Bk05",
        itemName: "Integrative Nutrition",
        catalogCategory: "Health & Fitness",
        description: "Its time for a reality check: there is no one-size-ﬁts-all diet. Learn the secrets of intuitive eating and start building a new relationship with your body. Integrative Nutrition is loaded with valuable insights into nutritional theories, simple ways to nurture your body and holistic approaches to maximize ",
        rating: 4,
        imgUrl: "../../assets/images/IntegrativeNutrition.jpg",
    },

    {
        itemCode: "Bk06",
        itemName: "The Beauty of Dirty Skin",
        catalogCategory: "Health & Fitness",
        description: "Every year, nearly 80 million Americans will consult their doctors about their skin. In fact, skin disorders beat out anxiety, depression, back pain, and diabetes as the number one reason Americans see their doctors.Unfortunately, however, the vast majority will receive only a surface-level treatment, leaving the underlying conditions at the root of their skin issues unresolved.",
        rating: 3,
        imgUrl: "../../assets/images/bods.jpg",
    },
    {
        itemCode: "Bk07",
        itemName: "100 Scientists Who Made History",
        catalogCategory: "Biography",
        description: "There is no publisher around that does a better job of packaging quality information in fun and visually exciting books than DK. They rule in this market and there's no close second. And this book is a perfect example of how they've mastered the art of sharing a lot of valuable (and interesting!)",
        rating: 4,
        imgUrl: "../../assets/images/wmh.jpg",
    },
    {
        itemCode: "Bk08",
        itemName: "Music: The Definitive Visual History",
        catalogCategory: "Biography",
        description: "The book is a comprehensive guide to the history of music, from opera to electronica.Telling the story of musical developments era by era, and linking musical theory, technology, and human genius into the narrative.Produced in association with the Smithsonian and including images from The National Music Museum.The book takes readers through the progression of music since its historic.",
        rating: 3,
        imgUrl: "../../assets/images/mih.jpg",
    },
    {
        itemCode: "Bk09",
        itemName: "Women in Sports",
        catalogCategory: "Biography",
        description: "Illustrated profiles of fifty pioneering female athletes, from the author of the New York Times bestseller Women in Science. A richly illustrated and inspiring book, Women in Sports highlights the achievements and stories of fifty notable women athletes from the 1800s to today, including trailblazers, Olympians, and record-breakers in more than forty sports.",
        rating: 5,
        imgUrl: "../../assets/images/wis.jpg",
    },
];


var getItems = function() {
    let items = [];
    for (let i = 0; i < data.length; i++) {
        let item = new Item(data[i].itemCode,
            data[i].itemName,
            data[i].catalogCategory,
            data[i].description,
            data[i].rating,
            data[i].imgUrl);
        items.push(item);

    } // end of for
    return items;

    // return data;
};

/**
 *
 * @param itemCode
 * @returns {*}
 */
var getItem = function(itemCode)
 {
   console.info("from DB, Item code :" + itemCode)
   for (var i = 0; i < data.length;i++) {
       //var itemCode = data.itemCode;
       console.log("Data" + JSON.stringify(data[i].imgUrl));
       if((data[i].itemCode) == itemCode)
       {
           console.log("Inside if");
           let item = new Item(data[i].itemCode,
               data[i].itemName,
               data[i].catalogCategory,
               data[i].description,
               data[i].rating,
               data[i].imgUrl
             );
           console.log("Item"+JSON.stringify(item));

           return item;
       }
   }
};
console.log(getItem("Bk02"));

var category = ["Sci-Fi & Fantasy","Health & Fitness","Biography"];
module.exports.getItem = getItem;
module.exports.getItems = getItems;

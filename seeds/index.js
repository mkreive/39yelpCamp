const mongoose = require("mongoose");
const cities = require("./cities");
const { places, descriptors } = require("./seedHelpers");
const Campground = require("../models/campground");

main().catch((err) => console.log(err));
async function main() {
    await mongoose.connect("mongodb://localhost:27017/yelp-camp");
    console.log("Mongo connection open on SEEEEEEEDS!");
}

const sample = (array) => array[Math.floor(Math.random() * array.length)];

const seedDB = async () => {
    await Campground.deleteMany({});
    for (let i = 0; i < 50; i++) {
        const random1000 = Math.floor(Math.random() * 1000);
        const price = Math.floor(Math.random() * 20) + 10;
        const camp = new Campground({
            location: `${cities[random1000].city}, ${cities[random1000].state} `,
            title: `${sample(descriptors)} ${sample(places)}`,
            image: "https://unsplash.com/collections/rScTgu5SO4g",
            description:
                "Lorem ipsum dolor sit amet consectetur adipisicing elit. Iure cum asperiores laudantium animi, quis enim, minus, sunt aliquid repellendus quos ducimus recusandae a possimus obcaecati laboriosam tempora non fuga repellat.",
            price,
        });
        await camp.save();
    }
};

seedDB().then(() => {
    mongoose.connection.close();
});

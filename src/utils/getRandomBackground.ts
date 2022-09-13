export const getRandomBackground = () => {
  let topic = "bakery";

  const topics = [
    "bakery",
    "food",
    "coffee",
    "cafe",
    "dinner",
    "breakfast",
    "lunch",
    "chocolate",
    "cake",
    "icecream",
    "fruits",
    "waffle"
  ];

  const random = Math.floor(Math.random() * topics.length);

  topic = topics[random];

  // const template = `url(https://source.unsplash.com/random/800x450/?${topic})`;
  const template = `url(https://source.unsplash.com/random/1920x1080/?${topic})`;


  return template;
};

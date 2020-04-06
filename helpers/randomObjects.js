const random = require("random-object-generator");

function testObject() {
  this.id = "id";
  this.name = "string";
  this.text = "string";
  this.timestamp = "date";
}

const object = random.randomObject(new testObject());

const posts = Array.from(
  { length: 10 },
  (x) => (x = random.randomObject(new testObject()))
);
// const pk = proto_posts.keys();

posts.forEach(function (value, i) {
  value.avatar = require("../assets/tempAvatar.jpg"); //
  value.image = require("../assets/tempImage1.jpg");
});
console.log(posts);

export default posts;

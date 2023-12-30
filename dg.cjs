const fs = require('node:fs/promises');
var mocker = require('mocker-data-generator').default; // (vanilla way)
var faker = require('faker');

var user = {
  firstName: {
    faker: 'name.firstName()',
  },
  lastName: {
    faker: 'name.lastName()',
  },
  country: {
    faker: 'address.country()',
  },
  createdAt: {
    faker: 'date.past()',
  },
  username: {
    function: function () {
      return (
        this.object.lastName.substring(0, 5) +
        this.object.firstName.substring(0, 3) +
        Math.floor(Math.random() * 10)
      );
    },
  },
};

var group = {
  description: {
    faker: 'lorem.paragraph()',
  },
  users: [
    {
      function: function () {
        return this.generators.faker.random.arrayElement(this.db.user).username;
      },
      length: 10,
      fixedLength: false,
    },
  ],
};
var conditionalField = {
  type: {
    values: ['HOUSE', 'CAR', 'MOTORBIKE'],
  },
  'object.type=="HOUSE",location': {
    faker: 'address.city()',
  },
  'object.type=="CAR"||object.type=="MOTORBIKE",speed': {
    faker: 'random.number()',
  },
};

async function mockit() {
  try {
    const data = await mocker()
      .addGenerator('faker', faker)
      .schema('user', user, 2)
      .schema('group', group, 2)
      .schema('conditionalField', conditionalField, 2)
      .build();
    console.log(data);
  } catch (err) {
    console.error(err);
  }
}
async function example() {
  try {
    await mockit();
    const content = 'Some content!';
    await fs.writeFile('./db/test.txt', content);
    await fs.appendFile('./db/test.txt', content);
  } catch (err) {
    console.log(err);
  }
}

example();

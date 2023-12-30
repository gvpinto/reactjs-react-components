import { faker } from '@faker-js/faker';

// faker.seed(123);

function createRandomCountries() {
  return {
    key: faker.location.countryCode('alpha-2'),
    value: faker.location.country(),
  };
}

function createRandomStates() {
  return {
    key: faker.location.state({ abbreviated: true }),
    value: faker.location.state(),
  };
}

const countryList = faker.helpers.multiple(createRandomCountries, {
  count: 20,
});

let i = 1;

let db = {};

// const countries = {
//   countries: countryList.map((country) => {
//     let j = 1;
//     const states = faker.helpers.multiple(createRandomStates, {
//       count: 10,
//     });
//     return {
//       id: i++,
//       ...country,
//       states: states.map((state) => {
//         return {
//           id: j++,
//           ...state,
//         };
//       }),
//     };
//   }),
// };

db = {
  countries: countryList.map((country) => {
    // let j = 1;
    // const states = faker.helpers.multiple(createRandomStates, {
    //   count: 10,
    // });
    return {
      id: i++,
      ...country,
      //   states: states.map((state) => {
      //     return {
      //       id: j++,
      //       ...state,
      //     };
      //   }),
    };
  }),
};

// const finalStates = [];

// let j = 1;
// db.states = db.countries.map((country) => {
//   const states = faker.helpers
//     .multiple(createRandomStates, {
//       count: 10,
//     })
//     .map((state) => {
//       return {
//         id: j++,
//         countryId: country.id,
//         ...state,
//       };
//     });
//   return states;
// });

db.states = [];
let j = 1;
db.countries.forEach((country) => {
  const states = faker.helpers
    .multiple(createRandomStates, {
      count: 10,
    })
    .map((state) => {
      return {
        id: j++,
        countryId: country.id,
        ...state,
      };
    });
  db.states.push(...states);
});

console.log(JSON.stringify(db));

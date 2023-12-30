import { faker } from '@faker-js/faker';

// faker.seed(123);

function createRandomCountries() {
  return {
    code: faker.location.countryCode('alpha-2'),
    value: faker.location.country(),
  };
}

function createRandomStates() {
  return {
    code: faker.location.state({ abbreviated: true }),
    value: faker.location.state(),
  };
}

const countryList = faker.helpers.multiple(createRandomCountries, {
  count: 10,
});

const countries = {
  countries: countryList.map((country) => {
    return {
      ...country,
      states: faker.helpers.multiple(createRandomStates, {
        count: 10,
      }),
    };
  }),
};

console.log(JSON.stringify(countries));

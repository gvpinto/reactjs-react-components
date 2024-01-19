import { faker } from '@faker-js/faker';

// faker.seed(123);

let users = [];
const totalUsers = 20;

for (let i = 0; i < totalUsers; i++) {
  const user = {
    id: i,
    name: faker.person.fullName({
      sex: 'female' | 'male',
    }),
    address: faker.location.streetAddress(false),
    city: faker.location.city(),
    state: faker.location.state(),
    zipcode: faker.location.zipCode('#####'),
    age: faker.number.int({
      min: 20,
      max: 50,
    }),
    // salary: faker.finance.amount({
    //   dec: 2,
    //   max: 200000,
    //   min: 50000,
    //   autoFormat: true,
    //   symbol: '$',
    // }),
    salary: Number(
      faker.finance.amount({
        dec: 2,
        max: 200000,
        min: 50000,
      }),
    ),
    hiredate: faker.date.past({ years: 10 }),
  };
  users.push(user);
}

// for (let i = 0; i < totalUsers; i++) {
//   const html = `<tr><td>${users[i].name}</td><td>${users[i].address}</td><td>${users[i].city}</td><td>${users[i].state}</td><td>${users[i].zipcode}</td><td>${users[i].age}</td><td>${users[i].salary}</td><td>${users[i].hiredate}</td></tr>`;
//   console.log(html);
// }

console.log(JSON.stringify(users));

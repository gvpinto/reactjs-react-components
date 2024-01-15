import axios from 'axios';

export async function getCountries() {
  try {
    const response = await axios.get('http://localhost:3004/countries');
    return response.data;
  } catch (error) {
    throw new Error('Error while retrieving the countries list');
  }
}

export async function getStates(countryId) {
  try {
    const response = await axios.get('http://localhost:3004/states', {
      params: {
        countryId,
      },
    });
    return response.data;
  } catch (error) {
    throw new Error('Error while retrieving the countries list');
  }
}

export async function getUsers() {
  try {
    const response = await axios.get('http://localhost:3004/users');
    return response.data;
  } catch (error) {
    throw new Error('Error while retrieving users');
  }
}

import axios from 'axios';

export async function getCountries() {
  try {
    const response = await axios.get('http://localhost:3004/countries');
    return response.data;
  } catch (error) {
    throw new Error('Error while retrieving the countries list');
  }
}

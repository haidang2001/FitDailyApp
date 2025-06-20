import axios from 'axios';

const API_URL = 'https://exercisedb.p.rapidapi.com/exercises';

const options = {
  method: 'GET',
  headers: {
    'X-RapidAPI-Key': '0c77a04b07msh7b1018aea0016f9p17a509jsnaba85eae4388',
    'X-RapidAPI-Host': 'exercisedb.p.rapidapi.com',
  },
};

export const fetchExercises = async () => {
  try {
    const response = await axios.get(API_URL, options);
    return response.data;
  } catch (error) {
    console.error('Error fetching exercises:', error);
    return [];
  }
};

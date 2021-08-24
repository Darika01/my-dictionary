import mockAxios from 'jest-mock-axios';

mockAxios.spread = jest.fn();
export default mockAxios;

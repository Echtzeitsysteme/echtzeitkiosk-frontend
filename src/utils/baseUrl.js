// import config from '../config';

export const baseUrl = path => {
    // const base = config.baseURL || 'http://localhost:4000/v1';
    const base = 'http://localhost:4000/v1';
    const parts = [base];
    parts.push(path.replace(/^\//, ''));
    return parts.join('/');
};

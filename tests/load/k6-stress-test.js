import http from 'k6/http';
import { check, sleep } from 'k6';

export const options = {
  stages: [
    { duration: '30s', target: 500 },  // Ramp up to 500 users
    { duration: '1m', target: 1000 },  // Spike to 1,000 users
    { duration: '2m', target: 5000 },  // Sustained load at 5,000 users
    { duration: '1m', target: 10000 }, // Max stress test at 10,000 users
    { duration: '30s', target: 0 },    // Cool down to 0
  ],
  thresholds: {
    http_req_duration: ['p(95)<500', 'p(99)<1000'], // 95% of requests must complete below 500ms
    http_req_failed: ['rate<0.01'],                 // Error rate must be less than 1%
  },
};

export default function () {
  // Test Health Endpoint
  let res = http.get('http://api:4000/api/health');
  check(res, {
    'status is 200': (r) => r.status === 200,
    'response time OK': (r) => r.timings.duration < 500,
  });
  
  sleep(Math.random() * 2); // Random sleep between 0 and 2 seconds
}

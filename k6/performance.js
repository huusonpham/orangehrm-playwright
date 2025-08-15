import http from 'k6/http';
import { sleep, check } from 'k6';
import { Trend } from 'k6/metrics';

const trend = new Trend('time_to_first_byte');

export const options = {
  vus: 10,
  duration: '30s',
  thresholds: {
    http_req_failed: ['rate<0.01'],
    http_req_duration: ['p(95)<800']
  }
};

export default function () {
  const res = http.get('https://opensource-demo.orangehrmlive.com/');
  trend.add(res.timings.waiting);
  check(res, {
    'status is 200': (r) => r.status === 200
  });
  sleep(1);
}

const AUTH_API_URL = 'http://localhost:3000/graphql';
const LOGIN_MUTATION = `
  mutation Login($loginInput: LoginInput!) {
    login(loginInput: $loginInput) {
      id
    }
  }
`;

const JOBS_API_URL = 'http://localhost:3001/graphql';
const EXECUTE_JOB_MUTATION = `
  mutation ExecuteJob($executeJobInput:       ExecuteJobInput!) {
    executeJob(executeJobInput: $executeJobInput) {
      name
    }
  }
`;

async function login(email, password) {
  const response = await fetch(AUTH_API_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      query: LOGIN_MUTATION,
      variables: {
        loginInput: { email, password },
      },
    }),
  });

  const data = await response.json();

  const cookies = response.headers.get('set-cookie');
  return { data, cookies };
}

async function executeJob(executeJobInput, cookies) {
  const response = await fetch(JOBS_API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Cookie: cookies,
    },
    body: JSON.stringify({
      query: EXECUTE_JOB_MUTATION,
      variables: { executeJobInput },
    }),
  });

  const result = await response.json();
  return result;
}

(async () => {
  const { data, cookies } = await login('admin@admin.com', 'Admin123$');

  if (data?.data?.login?.id) {
    const n = 1000;
    console.log(`Executing Fibonacci job for n=${n}...`);
    const executJobInput = {
      name: 'Fibonacci',
      data: Array.from({ length: n }, () => ({
        iterations: Math.floor(Math.random() * 5000) + 1,
      })),
    };
    const result = await executeJob(executJobInput, cookies);
    console.log('Job execution result:', result);
  } else {
    console.error('Login failed:', data);
  }
})();

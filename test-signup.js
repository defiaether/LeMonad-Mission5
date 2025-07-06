const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));

async function testSignup() {
  try {
    console.log('Testing signup...');
    
    const response = await fetch('http://localhost:4000/api/users/signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username: 'testuser123',
        email: 'test123@example.com',
        password: 'password123'
      })
    });
    
    console.log('Response status:', response.status);
    const data = await response.json();
    console.log('Response data:', data);
    
    if (response.ok) {
      console.log('✅ Signup successful!');
    } else {
      console.log('❌ Signup failed:', data.error);
    }
  } catch (error) {
    console.log('❌ Error:', error.message);
  }
}

testSignup(); 
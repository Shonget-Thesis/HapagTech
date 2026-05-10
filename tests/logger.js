function logRequest(endpoint) {
  console.log(`User accessed ${endpoint}`);
}

function logError(message) {
  console.error(`Error: ${message}`);
}

// Simulated logs
logRequest('/menu');
logRequest('/order');
logError('Failed to process order request');
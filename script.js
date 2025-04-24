const jwt = require("jsonwebtoken");

// Secret key for JWT - in production, this should be stored in environment variables
const JWT_SECRET = "your-secret-key";

const encrypt = (payload) => {
  try {
    // Create a JWT token with the payload
    const token = jwt.sign(payload, JWT_SECRET, { expiresIn: "1h" });
    return token;
  } catch (error) {
    console.error("Error encrypting token:", error);
    throw error;
  }
};

const decrypt = (token) => {
  try {
    // Verify and decode the JWT token
    const decoded = jwt.verify(token, JWT_SECRET);
    return decoded;
  } catch (error) {
    console.error("Error decrypting token:", error);
    throw error;
  }
};

// Test the functions
const testPayload = { userId: 123, role: "user" };
const token = encrypt(testPayload);
const decoded = decrypt(token);

console.log("Original payload:", testPayload);
console.log("Encrypted token:", token);
console.log("Decrypted payload:", decoded);

// Check if the decrypted payload matches the original
if (JSON.stringify(testPayload) === JSON.stringify(decoded)) {
  console.log("Success: Token encryption and decryption working correctly!");
} else {
  console.log("Error: Token encryption and decryption failed!");
}

module.exports = {
  encrypt,
  decrypt,
};

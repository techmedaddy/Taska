# Taksa - Blockchain-Based Wallet System

Taksa is a decentralized wallet management system designed for secure, fast, and transparent digital transactions. It leverages blockchain technology, ensuring immutability, security, and decentralization for financial operations.
This project integrates microservices architecture, where authentication, wallet management, transactions, and blockchain operations function as independent services. 
The system is built using Node.js (Express), TypeScript, PostgreSQL (Prisma ORM), Apache Kafka, Redis, and Docker.



![WhatsApp Image 2025-03-11 at 14 42 16_b830a5e2](https://github.com/user-attachments/assets/f2492182-bba0-4b42-9fac-33b415657c39)


### 📜 Technologies Used
    Node.js & Express - Backend framework
    TypeScript - Type-safe development
    PostgreSQL & Prisma ORM - Database management
    Kafka - Event-driven messaging
    Redis - Caching & quick data access
    Docker & Docker Compose - Containerized microservices
    React/Next.js - Frontend UI for dashboard (Optional)
    Blockchain - Secure ledger transactions (Future)

# 🌟 Key Features

## 1️⃣ Secure Wallet Management  
- Unique public key wallets for secure balance management.  
- Transactions are recorded and verified on the blockchain.  

## 2️⃣ Decentralized Transactions  
- Peer-to-peer transactions with no central authority.  
- Blockchain validation ensures immutability and atomic updates.  

## 3️⃣ Event-Driven Architecture with Kafka  
- Apache Kafka handles real-time transactions and wallet updates.  
- Ensures fault tolerance and high scalability.  

## 4️⃣ Fast Performance with Redis Caching  
- Redis caches wallet balances, reducing database load.  
- Enables fast retrieval and improved system performance.  

## 5️⃣ Scalable Microservices Architecture  
- Independent services for auth, wallets, transactions, and blockchain.  
- Supports horizontal scaling for high transaction volumes.  

## 6️⃣ Docker-Based Containerization  
- Uses Docker & Docker Compose for consistency across environments.  
- Services are isolated to prevent dependency conflicts.  

## 7️⃣ Prisma ORM for Database Management  
- PostgreSQL with Prisma ORM for structured data storage.  
- Simplifies database operations with type-safe queries.  

## 8️⃣ Blockchain Explorer & Future Enhancements  
- Tracks wallet transactions and confirms blockchain updates.  
- Future plans: smart contract integration for automated payments.  


# 💡 How It Works?

## 🔹 1. User Registration & Wallet Creation  
- User registers via the Auth Service.  
- A wallet with a public key is created, starting with a zero balance.  

## 🔹 2. Making a Transaction  
- User initiates a transaction to another wallet.  
- System verifies sender balance and processes the transaction atomically.  
- Kafka handles transaction confirmation & broadcasting.  

## 🔹 3. Real-Time Transaction Updates  
- Transaction events are published to Kafka topics.  
- Services listen to events, updating wallet balances.  
- Redis caches transactions for fast access.  

## 🔹 4. Blockchain Validation  
- Transactions are recorded on a blockchain ledger.  
- Explorer Service allows real-time tracking.  
- Future plans: Smart contracts for automated transactions.  


### 📂 Project Structure
```bash
Taska/
│── services/
│   ├── auth-service/            # Authentication & user management
│   ├── wallet-service/          # Wallet operations & transactions
│   ├── blockchain-service/      # Blockchain-related functionalities
│   ├── explorer-service/        # Blockchain explorer APIs
│── prisma/                      # Prisma schema & migrations
│── frontend/                    # Web application (React/Next.js)
│── config/                      # Environment & configuration files
│── docker-compose.yml           # Docker setup for all services
│── .env                         # Global environment variables
│── package.json                 # Project dependencies
│── README.md                    # Project documentation

```


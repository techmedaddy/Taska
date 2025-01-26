#!/bin/bash

# Kafka topics to create
TOPICS=("topic1" "topic2" "topic3")

# Kafka broker and zookeeper connection
BROKER="localhost:9092"

echo "Creating Kafka topics..."
for TOPIC in "${TOPICS[@]}"; do
    kafka-topics --create \
        --bootstrap-server "$BROKER" \
        --replication-factor 1 \
        --partitions 1 \
        --topic "$TOPIC" &&
        echo "Created topic: $TOPIC"
done

const {Kafka} = require("kafkajs");

const topicName = "RandomTopic" + new Date().getTime();
const brokerUrlTLS = process.env.NODE_ENV || "b-1.messagebus.3xve01.c19.kafka.us-east-1.amazonaws.com:9094";

run();
async function run(){
    try
    {
         const kafka = new Kafka({
              "clientId": "myapp",
              "brokers" :[brokerUrlTLS],
              "ssl": true
         })

        const admin = kafka.admin();
        console.log("Connecting.....")
        await admin.connect()
        console.log("Connected!")
        //A-M, N-Z
        await admin.createTopics({
            "topics": [{
                "topic" : topicName,
                "numPartitions": 2
            }]
        })
        console.log(`Topic ${topicName} successfully created!`)
        await admin.disconnect();
    }
    catch(ex)
    {
        console.error(`Something bad happened ${ex}`)
    }
    finally{
        process.exit(0);
    }
}
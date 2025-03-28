import { Kafka } from "kafkajs";

const TOPIC_NAME = "zap-events"


const kafka = new Kafka({
    clientId: 'outbox-sweeper',
    brokers: ['localhost:9092']
})


async function main() {
    const consumer = kafka.consumer({ groupId: 'processor' });
    await consumer.connect();


    consumer.subscribe({ topic: TOPIC_NAME, fromBeginning: true });


    consumer.run({
        autoCommit: false,
        eachMessage: async ({ topic, partition, message }) => {
            console.log({
                partition,
                offset: message.offset,
                value: message.value.toString(),
            })

            await new Promise(r => setTimeout(r, 3000));


            consumer.commitOffsets([{
                topic,
                partition,
                offset: (parseInt(message.offset) + 1).toString()
            }])
        }
    })

}


main().catch(console.error)
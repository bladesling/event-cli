import Debug from 'debug';
import { IQueueRepository, IEventsRepository} from "src/interfaces";

export class PublishService {

    private readonly _debug: Debug.Debugger = Debug('publish-service');

    private readonly _queue: IQueueRepository;
    private readonly _events: IEventsRepository;

    constructor(queue: IQueueRepository, events: IEventsRepository) {
        this._queue = queue;
        this._events = events;
    }

    async onPublish(key: string): Promise<void> {

        const event = this._events.getByKey(key);

        if (event !== null && event.data !== null) {

            this._debug('event onPublish');

            await this._queue.publish(event.exchange, event.key, event.contentType, event.data)
        }
    }
}
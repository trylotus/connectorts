import { TopicTypes } from '../src/client';
import { buildTopicProtoMsgs } from '../src/client'
import { MsgType } from '../../kafkautils/src/types'
import { Mint, Redeem } from './test_pb';

describe('Proto Registry', function () {
    test('checks buildTopicProtoMsgs()', async function () {

        let topicTypes: TopicTypes = {
            'lotus.test.0_0_0.test_Mint': new Mint(),
            'lotus.test.0_0_0.test_Redeem': new Redeem(),
        }

        let tpms = buildTopicProtoMsgs(topicTypes, MsgType.SYS)

        expect(tpms.length).toBe(2)
        expect(tpms[0].msg_type).toBe(MsgType.SYS)
        expect(tpms[0].topic).toBe('lotus.test.0_0_0.test_Mint')
        expect(tpms[0].proto_msg).toBe('lotus.test.test.Mint')

        expect(tpms[1].msg_type).toBe(MsgType.SYS)
        expect(tpms[1].topic).toBe('lotus.test.0_0_0.test_Redeem')
        expect(tpms[1].proto_msg).toBe('lotus.test.test.Redeem')
    })
})

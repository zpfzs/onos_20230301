/*
 * Copyright 2016-present Open Networking Foundation
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
package org.onosproject.roadm;

import com.fasterxml.jackson.databind.node.ObjectNode;
import com.google.common.collect.ImmutableSet;
import org.onlab.osgi.ServiceDirectory;
import org.onosproject.mastership.MastershipService;
import org.onosproject.net.AnnotationKeys;
import org.onosproject.net.Device;
import org.onosproject.net.DeviceId;
import org.onosproject.net.device.DeviceService;
import org.onosproject.ui.RequestHandler;
import org.onosproject.ui.UiConnection;
import org.onosproject.ui.UiMessageHandler;
import org.onosproject.ui.table.TableModel;
import org.onosproject.ui.table.TableRequestHandler;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
//import org.json.JSONObject;
//import org.json.JSONException;


import java.util.Collection;

import static org.onosproject.net.Device.Type;

/**
 * Table-View message handler for ROADM device view.
 */
public class RoadmDeviceViewMessageHandler extends UiMessageHandler {

    private static final String ROADM_DEVICE_DATA_REQ = "roadmDataRequest";
    private static final String ROADM_DEVICE_DATA_RESP = "roadmDataResponse";
    private static final String ROADM_DEVICES = "roadms";

    private static final String ID = "id";
    private static final String NAME = "name";
    private static final String TYPE = "type";
    private static final String MASTER = "master";
    private static final String PORTS = "ports";
    private static final String VENDOR = "vendor";
    private static final String HW_VERSION = "hwVersion";
    private static final String SW_VERSION = "swVersion";
    private static final String PROTOCOL = "protocol";

    //定义触发数据类型
    private static final String HI_SGP_RESP = "hiResponse";
    private static final String THERECEIVE = "receive message";

    private static final String STATUS="status";
    private static final String USER_NAME="user_name";
    private static final String TENANT_NAME="tenant_name";
    private static final String CREATE_TIME="creat_time";

    //发送字符
    public String theFirst;
    public String theSecond;

    //
    private static final String HELLOWORLD_REQ = "helloworldRequest";
    private static final String THE_FIRST_WORD = "thefirstword";
    private static final String THE_SECOND_WORD = "thesecondworld";

    private final Logger log = LoggerFactory.getLogger(getClass());

    private static final String[] COLUMN_IDS = {
            ID, NAME, TYPE, MASTER, PORTS, VENDOR, HW_VERSION, SW_VERSION, PROTOCOL
    };

    private DeviceService deviceService;
    private MastershipService mastershipService;

    @Override
    public void init(UiConnection connection, ServiceDirectory directory) {
        super.init(connection, directory);
        deviceService = get(DeviceService.class);
        mastershipService = get(MastershipService.class);
    }

    @Override
    protected Collection<RequestHandler> createRequestHandlers() {
        return ImmutableSet.of(new DeviceTableDataRequestHandler(), new SayHelloWorld());
    }

    // Handler for sample table requests
    private final class DeviceTableDataRequestHandler extends TableRequestHandler {

        private DeviceTableDataRequestHandler() {
            super(ROADM_DEVICE_DATA_REQ, ROADM_DEVICE_DATA_RESP, ROADM_DEVICES);
        }

        @Override
        protected String[] getColumnIds() {
            return COLUMN_IDS;
        }

        @Override
        protected String noRowsMessage(ObjectNode payload) {
            return RoadmUtil.NO_ROWS_MESSAGE;
        }

        @Override
        protected void populateTable(TableModel tm, ObjectNode payload) {
            for (Device device : deviceService.getDevices()) {
                Type type = device.type();
                if (type == Type.ROADM || type == Type.TERMINAL_DEVICE
                        || type == Type.OPTICAL_AMPLIFIER || type == Type.FIBER_SWITCH
                        || type == Type.ROADM_OTN
                        || type == Type.OTN
                        || type == Type.OLS) {
                    populateRow(tm.addRow(), device);
                }
            }
        }

        private void populateRow(TableModel.Row row, Device device) {
            DeviceId devId = device.id();
            String id = devId.toString();
            row.cell(ID, id)
                    .cell(NAME, RoadmUtil.getAnnotation(device.annotations(), AnnotationKeys.NAME, id))
                    .cell(TYPE, RoadmUtil.objectToString(device.type(), RoadmUtil.UNKNOWN))
                    .cell(MASTER, mastershipService.getMasterFor(devId))
                    .cell(PORTS, deviceService.getPorts(devId).size())
                    .cell(VENDOR, device.manufacturer())
                    .cell(HW_VERSION, device.hwVersion())
                    .cell(SW_VERSION, device.swVersion())
                    .cell(PROTOCOL, RoadmUtil.getAnnotation(device.annotations(), PROTOCOL));
        }
    }

    private final class SayHelloWorld extends RequestHandler {
        private SayHelloWorld() {
            super(HELLOWORLD_REQ);
        }

        @Override
        public void process(ObjectNode payload) {
            theFirst = string(payload, THE_FIRST_WORD);
            log.info("The first word : {}",theFirst);
            theSecond = string(payload, THE_SECOND_WORD);
            log.info("The second word : {}",theSecond);

//            String str_t=""
//            String str_t = " {\n" +
//                    "            \"OS-EXT-STS:task_state\": null,\n" +
//                    "            \"addresses\": {},\n" +
//                    "            \"links\": [\n" +
//                    "                {\n" +
//                    "                    \"href\": \"https://10.190.85.44:8774/v2.1/servers/e00d7561-75af-434d-8d4d-b702d07b3231\",\n" +
//                    "                    \"rel\": \"self\"\n" +
//                    "                },\n" +
//                    "                {\n" +
//                    "                    \"href\": \"https://10.190.85.44:8774/servers/e00d7561-75af-434d-8d4d-b702d07b3231\",\n" +
//                    "                    \"rel\": \"bookmark\"\n" +
//                    "                }\n" +
//                    "            ],\n" +
//                    "            \"image\": {\n" +
//                    "                \"id\": \"8847719c-f78b-41ab-ad72-43d427534560\",\n" +
//                    "                \"links\": [\n" +
//                    "                    {\n" +
//                    "                        \"href\": \"https://10.190.85.44:8774/images/8847719c-f78b-41ab-ad72-43d427534560\",\n" +
//                    "                        \"rel\": \"bookmark\"\n" +
//                    "                    }\n" +
//                    "                ]\n" +
//                    "            },\n" +
//                    "            \"OS-EXT-STS:vm_state\": \"error\",\n" +
//                    "            \"OS-EXT-SRV-ATTR:instance_name\": \"instance-00000009\",\n" +
//                    "            \"OS-SRV-USG:launched_at\": null,\n" +
//                    "            \"flavor\": {\n" +
//                    "                \"id\": \"4U8G100G\",\n" +
//                    "                \"links\": [\n" +
//                    "                    {\n" +
//                    "                        \"href\": \"https://10.190.85.44:8774/flavors/4U8G100G\",\n" +
//                    "                        \"rel\": \"bookmark\"\n" +
//                    "                    }\n" +
//                    "                ]\n" +
//                    "            }\n" +
//                    "}";
//            try {
//                JSONObject json = new JSONObject();
//                json.put("sd","sdf");
//
//
//            }catch (JSONException e){
//                e.printStackTrace();
//            }
//            String theUSER_ID = json.getString("sd");
//            public void JSONObject createJSONObject() throws JSONException {
//                JSONObject jsonObject = new JSONObject();
//                jsonObject.put("sd","sdf");
//                return jsonObject;
//            }
//            String theUSER_ID = createJSONObject.getString("sd");


//            String str_t = "{\"name\":\"Yolo\",\"Address\":\"Beijing\"}";
//            JSONObject jsonObject = JSON.parseObject(str_t);
//            String theUSER_ID = jsonObject.getString("name");


//            String theResponse = "hi yike";
//            String theSTATUS = "receive message11";
//            String theUSER_NAME = "admin";
//            String theTENANT_NAME = "admin";
//            String theCREATE_TIME = "2023-02-10 16:42:53";


            String theGet = "{\n" +
                    "    \"code\": 0,\n" +
                    "    \"msg\": \"响应成功\",\n" +
                    "    \"data\": {\n" +
                    "        \"total\": 2,\n" +
                    "        \"neList\": [\n" +
                    "            {\n" +
                    "                \"id\": \"78\",\n" +
                    "                \"password\": \"fiberhome\",\n" +
                    "                \"username\": \"fiberhome\",\n" +
                    "                \"snId\": \"344b00000100\",\n" +
                    "                \"customName\": \"78\",\n" +
                    "                \"managerIp\": \"10.190.85.78/24\",\n" +
                    "                \"status\": \"connected\",\n" +
                    "                \"nodeId\": \"78\",\n" +
                    "                \"version\": \"V1R2-2021-10-19-21:57:28\",\n" +
                    "                \"mergeNe\": \"78\",\n" +
                    "                \"deviceType\": \"device\",\n" +
                    "                \"timezone\": \"Asia/Shanghai\"\n" +
                    "            },\n" +
                    "            {\n" +
                    "                \"id\": \"79\",\n" +
                    "                \"password\": \"fiberhome\",\n" +
                    "                \"username\": \"fiberhome\",\n" +
                    "                \"snId\": \"344b00000101\",\n" +
                    "                \"customName\": \"79\",\n" +
                    "                \"managerIp\": \"10.190.85.79/24\",\n" +
                    "                \"status\": \"connected\",\n" +
                    "                \"nodeId\": \"79\",\n" +
                    "                \"version\": \"V1R2-2021-10-19-21:57:28\",\n" +
                    "                \"mergeNe\": \"79\",\n" +
                    "                \"deviceType\": \"device\",\n" +
                    "                \"timezone\": \"Asia/Shanghai\"\n" +
                    "            }\n" +
                    "        ],\n" +
                    "        \"chassisList\": null,\n" +
                    "        \"cardList\": null,\n" +
                    "        \"portList\": null\n" +
                    "    }\n" +
                    "}";

//
            ObjectNode test = objectNode();
////            test.put(STATUS, theSTATUS);
////            test.put(USER_NAME, theUSER_NAME);
////            test.put(TENANT_NAME, theTENANT_NAME);
////            test.put(CREATE_TIME, theCREATE_TIME);
////            test.put(THERECEIVE, theResponse);
////            test.put(THERECEIVE, theUSER_ID);
            test.put(THERECEIVE, theGet);
//            //riskLink.put(LINK_RISK_ID,linkId);
            sendMessage(HI_SGP_RESP, test);

        }
    }
}
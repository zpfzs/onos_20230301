import { Component, OnInit } from '@angular/core';
import { StorageService } from '../../../../roadm/services/storage.service';
import {
    FnService,
    LogService,
    WebSocketService,
    SortDir, TableBaseImpl, TableResponse
} from 'gui2-fw-lib';
declare var echarts:any;
@Component({
  selector: 'roadm-app-firberhome1',
  templateUrl: './firberhome1.component.html',
  styleUrls: ['./firberhome1.component.css']
})
export class Firberhome1Component implements OnInit {

  public pic3 = "https://pic4.zhimg.com/80/v2-207e1cf40966e6f3f18fd6558015de3f_720w.jpg";
  public option1:any;
  public option2:any;
  public option3:any;
  public adress:string="10.112.231.75";
  public mirror_image:any[]=["镜像1","镜像2","镜像3","镜像4"];
  public segment:any[]=["网段1","网段2","网段3"];
  public config:any[]=["配置1","配置2","配置3"];
  public vm:any={
    name:"",
    id:"",
    region:"",
    create_time:"",
    ip:"",
    image:"",
    status:""
  }
  public creat_form:any={
    name:"",
    image:"",
    seg:"",
    cfg:""
  }
  public vmlist:any[]=[];
  public delete_name_list:any[]=[];
  public delete_vm:any;
  public handlers:any[]=[];
  public receive:string='';
  public receiveData:any={
    status:"",
    u_name:"",
    T_name:"",
    time:""
  }
  public recj:any;
  constructor(public storage:StorageService,
            protected fs: FnService,
            protected log: LogService,
            protected wss: WebSocketService,) {
  }
  test(){
  console.log('接收',this.receive);
  console.log('类型',typeof this.receive);
  let aq = JSON.parse(this.receive);
//   console.log(aq);
  this.recj = aq;
  console.log(this.recj.data.neList);
//     console.log('接收',this.receiveData);
  }
  SendMessageToBackward(){
              if(this.wss.isConnected){
                  this.wss.sendEvent('helloworldRequest',{
                  'thefirstword':'hello',
                  'thesecondworld':'world',
                  });
                  this.log.info('websocket发送helloworld成功');
              }
  }
  ReceiveMessageFromBackward(){
        this.wss.bindHandlers(new Map<string,(data)=>void>([
            ['hiResponse',(data)=>{
                this.log.info(data);
//                 this.receiveData.status = data['status'];
//                 this.receiveData.u_name = data['user_name'];
//                 this.receiveData.T_name = data['tenant_name'];
//                 this.receiveData.time = data['creat_time'];
                this.receive = data['receive message'];
            }]
        ]));
        this.handlers.push('hiResponse');
        this.SendMessageToBackward();
        setTimeout(() => {this.test();},2000);
  }

  vmpush(){
      this.vmlist.push(JSON.parse(JSON.stringify(this.vm)));
      this.storage.set('vmlist',this.vmlist);//装入服务
      this.delete_name_list.push(JSON.parse(JSON.stringify(this.vm.name)));
      this.storage.set('namelist',this.delete_name_list);

  }
  judge(){
    let logo=0;
    for(let i=0;i<this.vmlist.length;i++){
        if(this.vmlist[i].name==this.creat_form.name){
            logo=1;
        }
    }
    if(logo==1){
        alert("名称重复!");
    }else{this.submit();}
  }
  del() {
    let del_v=this.delete_vm
    console.log("shancuyuansu",this.delete_vm);
    let index=-1
    for(let i=0;i<this.vmlist.length;i++){
        console.log(this.vmlist[i])
        if(this.vmlist[i].name==del_v){
            index=i
        }
    }
    console.log("index",index);
    if(index>-1){
        this.vmlist.splice(index,1);
        console.log(this.vmlist);
        this.delete_name_list.splice(index,1);
        this.storage.set('vmlist',this.vmlist);
        this.storage.set('namelist',this.delete_name_list);
    }
    window.location.reload();

  }
  clear(){
  this.vmlist=[]
  this.delete_name_list=[]
  this.storage.set('vmlist',this.vmlist);
  this.storage.set('namelist',this.delete_name_list);

  }
  submit() {
    this.vm.name=this.creat_form.name;
    this.vm.id="待确定";
    this.vm.region="待确定";
    this.vm.create_time="待确定";
    this.vm.ip="待确定";
    this.vm.image=this.creat_form.image;
    this.vm.status="待确定";
    this.storage.set('vm',this.vm);
    this.vmpush();
    console.log("列表长度",this.vmlist.length);
  }
  ngOnInit() {
    let myChart1=echarts.init(document.getElementById('bar1'));
                  this.option1 = {
                      tooltip: {
                        trigger: 'item'
                      },
                      legend: {
                        top: '5%',
                        left: 'center'
                      },
                      series: [
                        {
                          name: 'Access From',
                          type: 'pie',
                          radius: ['40%', '70%'],
                          avoidLabelOverlap: false,
                          label: {
                            show: false,
                            position: 'center'
                          },
                          emphasis: {
                            label: {
                              show: true,
                              fontSize: '40',
                              fontWeight: 'bold'
                            }
                          },
                          labelLine: {
                            show: false
                          },
                          data: [
                            { value: 700, name: '占用' },
                            { value: 300, name: '空闲' }
                          ]
                        }
                      ]
                  };
                  myChart1.setOption(this.option1);

    let myChart2=echarts.init(document.getElementById('bar2'));
                      this.option2 = {
                          tooltip: {
                            trigger: 'item'
                          },
                          legend: {
                            top: '5%',
                            left: 'center'
                          },
                          series: [
                            {
                              name: 'Access From',
                              type: 'pie',
                              radius: ['40%', '70%'],
                              avoidLabelOverlap: false,
                              label: {
                                show: false,
                                position: 'center'
                              },
                              emphasis: {
                                label: {
                                  show: true,
                                  fontSize: '40',
                                  fontWeight: 'bold'
                                }
                              },
                              labelLine: {
                                show: false
                              },
                              data: [
                                { value: 650, name: '占用' },
                                { value: 350, name: '空闲' }
                              ]
                            }
                          ]
                      };
                      myChart2.setOption(this.option2);

    let myChart3=echarts.init(document.getElementById('bar3'));
                      this.option3 = {
                          tooltip: {
                            trigger: 'item'
                          },
                          legend: {
                            top: '5%',
                            left: 'center'
                          },
                          series: [
                            {
                              name: 'Access From',
                              type: 'pie',
                              radius: ['40%', '70%'],
                              avoidLabelOverlap: false,
                              label: {
                                show: false,
                                position: 'center'
                              },
                              emphasis: {
                                label: {
                                  show: true,
                                  fontSize: '40',
                                  fontWeight: 'bold'
                                }
                              },
                              labelLine: {
                                show: false
                              },
                              data: [
                                { value: 600, name: '占用' },
                                { value: 400, name: '空闲' }
                              ]
                            }
                          ]
                      };
                      myChart3.setOption(this.option3);




    let list1=this.storage.get('vmlist')//导出服务
        if(list1){
          this.vmlist=list1;
        }
        let obj1=this.storage.get('vm')//导出服务
        if(obj1){
          this.vm=obj1;
        }
        let name1=this.storage.get('namelist')
        if(name1){
          this.delete_name_list=name1;
        }

  }

}

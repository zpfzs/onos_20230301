import { Component, OnInit } from '@angular/core';
declare var echarts:any;
@Component({
  selector: 'roadm-app-dcn',
  templateUrl: './dcn.component.html',
  styleUrls: ['./dcn.component.css']
})
export class DcnComponent implements OnInit {
  public pic3 = "https://pic4.zhimg.com/80/v2-207e1cf40966e6f3f18fd6558015de3f_720w.jpg";
  public pic4 = "https://pic1.zhimg.com/v2-bb49423ef1aebdeb235712ad8e358f2c_b.jpg";
  public pic5 = "https://pic2.zhimg.com/v2-d46bbb5c6a0d82c5b32aaa82c93563fd_b.jpg";
  public pic6 = "https://pic2.zhimg.com/v2-41dd4eb85d724594cbd02a26e63d55bd_b.jpg";
  public pic7 = "https://pic4.zhimg.com/v2-8a230069918cfe3fff264c9f48be07b3_b.jpg";
  public defender:number=5;
  public wlan:number=3;
  public switch:number=2;
  public server:number=8;
  public option1:any;
  public option2:any;
  public option3:any;
  public option4:any;
  constructor() { }

  ngOnInit() {
  let myChart1=echarts.init(document.getElementById('chart1'));
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
            fontSize: 40,
            fontWeight: 'bold'
          }
        },
        labelLine: {
          show: false
        },
        data: [
          { value: 5, name: '交换机' },
          { value: 5, name: '网关' }
        ]
      }
    ]
  };
  myChart1.setOption(this.option1);
  let myChart2=echarts.init(document.getElementById('part21'));
  let datas = [
    [
      { name: '占用', value: 30 },
      { name: '空闲', value: 70 }
    ]
  ];
  this.option2 = {
    title: {
      text: '使用情况',
      left: 'center',
      textStyle: {
        color: '#999',
        fontWeight: 'normal',
        fontSize: 14
      }
    },
    series: datas.map(function (data, idx) {
      var top = idx * 33.3;
      return {
        type: 'pie',
        radius: [20, 60],
        top: top + '%',
        height: '100%',
        left: 'center',
        width: 400,
        itemStyle: {
          borderColor: '#fff',
          borderWidth: 1
        },
        label: {
          alignTo: 'edge',
          formatter: '{name|{b}}\n{time|{c} 个}',
          minMargin: 5,
          edgeDistance: 10,
          lineHeight: 15,
          rich: {
            time: {
              fontSize: 10,
              color: '#999'
            }
          }
        },
        labelLine: {
          length: 15,
          length2: 0,
          maxSurfaceAngle: 80
        },
        labelLayout: function (params) {
          const isLeft = params.labelRect.x < myChart2.getWidth() / 2;
          const points = params.labelLinePoints as number[][];
          // Update the end point.
          points[2][0] = isLeft
            ? params.labelRect.x
            : params.labelRect.x + params.labelRect.width;

          return {
            labelLinePoints: points
          };
        },
        data: data
      };
    })
  };
  myChart2.setOption(this.option2);
  let myChart3=echarts.init(document.getElementById('part22'));
  let datas1 = [
    [
      { name: 'GE', value: 1 },
      { name: '10GE', value: 144 },
      { name: '40GE', value: 18 },
      { name: '100GE', value: 3 }
    ]
  ];
  this.option3 = {
    title: {
      text: '带宽容量',
      left: 'center',
      textStyle: {
        color: '#999',
        fontWeight: 'normal',
        fontSize: 14
      }
    },
    series: datas1.map(function (data, idx) {
      var top = idx * 33.3;
      return {
        type: 'pie',
        radius: [20, 60],
        top: top + '%',
        height: '100%',
        left: 'center',
        width: 400,
        itemStyle: {
          borderColor: '#fff',
          borderWidth: 1
        },
        label: {
          alignTo: 'edge',
          formatter: '{name|{b}}\n{time|{c} 个}',
          minMargin: 5,
          edgeDistance: 10,
          lineHeight: 15,
          rich: {
            time: {
              fontSize: 10,
              color: '#999'
            }
          }
        },
        labelLine: {
          length: 15,
          length2: 0,
          maxSurfaceAngle: 80
        },
        labelLayout: function (params) {
          const isLeft = params.labelRect.x < myChart3.getWidth() / 2;
          const points = params.labelLinePoints as number[][];
          // Update the end point.
          points[2][0] = isLeft
            ? params.labelRect.x
            : params.labelRect.x + params.labelRect.width;

          return {
            labelLinePoints: points
          };
        },
        data: data
      };
    })
  };
  myChart3.setOption(this.option3);
  let myChart4=echarts.init(document.getElementById('part3'));
  this.option4 = {
    legend: {},
    tooltip: {},
    dataset: {
      source: [
        ['product', 'CPU使用率', 'MEM使用率', 'DISK使用率'],
        ['member2', 43.3, 85.8, 93.7],
        ['member3', 83.1, 73.4, 55.1],
        ['member1', 86.4, 65.2, 82.5]
      ]
    },
    xAxis: { type: 'category' },
    yAxis: { name:'使用率%' },
    // Declare several bar series, each will be mapped
    // to a column of dataset.source by default.
    series: [{ type: 'bar' ,itemStyle:{normal:{ barBorderRadius:[30, 30, 0, 0]}}}, { type: 'bar' ,itemStyle:{normal:{ barBorderRadius:[30, 30, 0, 0]}}}, { type: 'bar',itemStyle:{normal:{ barBorderRadius:[30, 30, 0, 0]}} }]
  };
  myChart4.setOption(this.option4);
  }

}

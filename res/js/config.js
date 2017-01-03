// 配置文件，自行配置
var windowSize = {
	width: 800,
	height: 600
};

var screenSize = {
	width: window.innerWidth,
	height: window.innerHeight
};

windowSize = screenSize;

var shellScale = 3;


// 贝壳key，类别名字
var shellTypes = [{
	prefix: '1',
	name: '食用腹足类',
	shells: [{
		name: '螺纹鲍螺',
		img: 'res/img/2_1.png'
	}, {
		name: '大枇杷螺',
		img: 'res/img/2_2.png'
	}, {
		name: '宝岛骨螺',
		img: 'res/img/2_3.png'
	}, {
		name: '红鲍',
		img: 'res/img/2_4.png'
	}, {
		name: '龟甲宝螺',
		img: 'res/img/2_5.png'
	}, {
		name: '纵肋织纹螺',
		img: 'res/img/2_6.png'
	}]
}, {
	prefix: '2',
	name: '食用双壳类',
	shells: [{
		name: '厚壳海扇蛤',
		img: 'res/img/3_1.png'
	}, {
		name: '血蚶',
		img: 'res/img/3_2.png'
	}, {
		name: '半扭魁蛤',
		img: 'res/img/3_3.png'
	}, {
		name: '中国江珧',
		img: 'res/img/3_4.png'
	}, {
		name: '缢蛏',
		img: 'res/img/3_5.png'
	}, {
		name: '厚壳贻贝',
		img: 'res/img/3_6.png'
	}]
}, {
	prefix: '3',
	name: '食用陆贝和氮贝',
	shells: [{
		name: '三角帆蚌',
		img: 'res/img/1_1.png'
	}, {
		name: '法国大蜗牛',
		img: 'res/img/1_2.png'
	}, {
		name: '中国圆田螺',
		img: 'res/img/1_3.png'
	}, {
		name: '江蚬',
		img: 'res/img/1_4.png'
	}, {
		name: '花带羊角螺',
		img: 'res/img/1_5.png'
	}, {
		name: '褶纹冠蚌',
		img: 'res/img/1_6.png'
	}]
}];


// 背景图片
var backgroundImage = 'res/img/bg.jpg';

var initPositions = initPosition(screenSize.width, screenSize.height);

var timeout = 60;

var font = 'TianZhen';
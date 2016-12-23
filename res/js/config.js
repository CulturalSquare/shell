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
	name: '淡水贝类',
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
}, {
	prefix: '2',
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
	prefix: '3',
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
}];


// 图片路径，贝壳名字
var shellImages = [
	['res/img/bunny.png', '1'],
	['res/img/bunny.png', '2'],
	['res/img/bunny.png', '3'],
	['res/img/bunny.png', '4'],
	['res/img/bunny.png', '5'],
	['res/img/bunny.png', '6'],
	['res/img/bunny.png', '7'],
	['res/img/bunny.png', '8'],
	['res/img/bunny.png', '9'],
	['res/img/bunny.png', '10'],
];

// 文本内容，贝壳名字
var shellMessages = [
	['文本内容，贝壳名字1', '1'],
	['文本内容，贝壳名字2', '2'],
	['文本内容，贝壳名字3', '3'],
	['文本内容，贝壳名字4', '4'],
	['文本内容，贝壳名字5', '5'],
	['文本内容，贝壳名字6', '6'],
	['文本内容，贝壳名字7', '7'],
	['文本内容，贝壳名字8', '8'],
	['文本内容，贝壳名字9', '9'],
	['文本内容，贝壳名字10', '10'],
];

// 背景图片
var backgroundImage = 'res/img/bg.jpg';

var initPositions = initPosition(windowSize.width, windowSize.height);
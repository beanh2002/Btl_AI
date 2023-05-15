var Data;
var Queue = [];
var visited = [];

//BFS
export function BreadthFirstSearch(arrayData,startNode,endNode,SPEED){
    // tạo mảng data
    Data = new Array(2);
    //gán gtri từ arrayData cho data
    Data = arrayData;
    // hàng đợi
    Queue = [];
    // mảng lưu các nút đã đc thăm
    visited = [];
    let found = false;
    //Tìm nút bắt đầu startNode và gán gtri nút tương ứng trong mảng data cho startNode
    for (let i = 0; i < Data.length; i++) {
        for (let j = 0; j < Data.length; j++) {
            if(Data[i][j].id==startNode){
                startNode = Data[i][j];
                found = true;
                break;
            }
            if(found){
                break;
            }
        }
    }
    // thêm startNode vào hàng đợi và mảng chứa các nút đã đc thăm
    Queue.push(startNode);
    visited.push(startNode);
    // duyệt các nút trong hàng đợi
    while(Queue.length != 0){
        // nút đầu tiên trong hàng đợi
        let x = Queue.shift();
        // duyệt các nút kề với x, nếu chưa đc thăm thì thêm vào hàng đợi và mảng các nút đã đc thăm
        for (let i = 0; i < x.neighbors.length; i++) {
            if (checkVisitedNode(x.neighbors[i])){
                Queue.push(x.neighbors[i]);
                visited.push(x.neighbors[i]);
            }
        }
    }
    // vẽ màu cho các nút đã đc thăm
    bfsAnimate(visited,endNode,SPEED)
}

// hàm kiểm tra xem nút đã đc thăm hay chưa
function checkVisitedNode(node){
    for (let i = 0; i < visited.length; i++) {
        if(node == visited[i]){
            return false;
        }   
    }
    return true;
}

//vẽ màu
function bfsAnimate(data,stop,speed){
    let notfound = true;
    // duyệt từ ptu thứ 2 trong data vì ptu 1 là vị trí bắt đầu
    for (var i = 1; i < data.length; i++) {
        // lấy id gắn vào x
        let x = data[i].id;
        if(x!=stop){
            setTimeout(function(){
                $("#"+x).addClass("animate"); //thêm màu cho nút có id là x với tgian chờ
            },(i+1)*20*speed); // tgian chờ
        }else{
            notfound = false;
            setTimeout(function(){
                alert("Tìm thấy đích! \nSau "+(i-1)+" nút đã duyệt.");
                // Bỏ thuộc tính "disabled" khỏi các phần tử có id là wall,... cho phép tương tác với chúng
                $("#wall").removeAttr('disabled');
                $("#clear").removeAttr('disabled');
                $("#size").removeAttr('disabled');
                $("#speed").removeAttr('disabled');
                $("#start").removeAttr('disabled');
            },(i+3)*20*speed);
            break
        }
    }
    if(notfound){
        setTimeout(function(){
            alert("Không tìm thấy đích!");
            // Bỏ thuộc tính "disabled" khỏi các phần tử có id là wall,... cho phép tương tác với chúng
            $("#wall").removeAttr('disabled');
            $("#clear").removeAttr('disabled');
            $("#size").removeAttr('disabled');
            $("#speed").removeAttr('disabled');
            $("#start").removeAttr('disabled');
        },(i+3)*20*speed);
    }
}
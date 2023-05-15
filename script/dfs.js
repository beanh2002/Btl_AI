var Data;
var visited = [];
var spotted = false

//DFS
export function DepthFirstSearch(arrayData,startNode,endNode,SPEED){

    // tạo mảng data
    Data = new Array(2);
    // gán gtri từ arrayData cho data
    Data = arrayData;
    // mảng chứa nút đã dc thăm
    visited = [];
    let found = false;

    // tìm nút bắt đầu và gắn cho startNode
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
    // gọi hàm duyệt các nút kề
    graphTraversal(startNode,endNode);
    // vẽ màu cho các nút đã đc thăm
    dfsanimate(visited,endNode,SPEED);
}
//Recursion
function graphTraversal(node,stop){
    // nếu là đích
    if(spotted){
        //pass
    }else{
        // nếu ko phải là đích
        node.visited = true;
        // thêm node.id và mảng chứa các nút đã đc thăm
        visited.push(node.id);
        // duyệt các nút kề
        for (let i = 0; i < node.neighbors.length; i++) {
            // nếu chưa đc thăm
            if(!node.neighbors[i].visited){
                // gọi hàm đệ quy graphTraversal cho nút kề đó
                graphTraversal(node.neighbors[i]);
            }  
        }
        if(node==stop){
            spotted = true;
        }
    }
}

//Animate
function dfsanimate(data,stop,speed){
    let notfound = true;
    // duyệt từ ptu thứ 2 trong data vì ptu 1 là vị trí bắt đầu
    for (var i = 1; i < data.length; i++) {
        // lấy id gắn vào x
        let x = data[i];
        if(x!=stop){
            setTimeout(function(){
                $("#"+x).addClass("animate");//thêm màu cho nút có id là x với tgian chờ
            },(i+1)*20*speed);// tgian chờ
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
            alert("Không tìm thấy đich!");
            // Bỏ thuộc tính "disabled" khỏi các phần tử có id là wall,... cho phép tương tác với chúng
            $("#wall").removeAttr('disabled');
            $("#clear").removeAttr('disabled');
            $("#size").removeAttr('disabled');
            $("#speed").removeAttr('disabled');
            $("#start").removeAttr('disabled');
        },(i+3)*20*speed);
    }
}

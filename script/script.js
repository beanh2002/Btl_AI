import {BreadthFirstSearch} from './bfs.js'
import {DepthFirstSearch} from './dfs.js'

$(document).ready(function () {
  //Set pevious State
  var SIZE = 22;
  var SPEED = 3;
  var ALGORITHM = 1;
  var startid, endid;
  var isDown = false;
  var wall = [];
  var uniqueId;
  var data = new Array(2);

  //hiển thị lưới trên màn hình
  displayGrid(SIZE);

  //Chọn tất cả các phần tử input có type= range gắn cho 1 sk change
  $("[type=range]").change(function () {
    // lấy gtri từ input gán cho newval
    var newval = $(this).val();
    if (this.id == "speed") {
      // hiện thi gtri speed mới
      $("#speed_dis").text(newval);
      // cập nhật gtri speed mới
      SPEED = newval;
    } else {
      // hiện thị gtri size mới
      $("#size_dis").text(newval);
      // cập nhật gtri size mới
      SIZE = newval;
      // đặt lại startid, endid
      startid = undefined;
      endid = undefined;
      // hiện thị lưới mới
      displayGrid(SIZE);
    }
  });

  //hiển thị lưới trên màn hình
  function displayGrid(x) {
    //Xóa nội dung hiện tại của phần tử có class "screen" và gán bằng rỗng
    $(".screen").html(" ");
    //Tính toán độ rộng của mỗi ô lưới
    let screenWidth = $(".screen").innerWidth() / SIZE;
    //thêm một đoạn mã HTML vào phần tử có class "screen" để tạo ra các ô lưới
    for (let i = 0; i < x * x; i++) {
      $(".screen").append('<div class="unit" id="' + i + '"></div>');
    }
    //Đặt độ rộng và chiều cao của các ô lưới
    $(".unit").css("width", screenWidth + "px");
    $(".unit").css("height", screenWidth + "px");
  }

  //khi thay đổi kích thước size
  $(window).on("resize", function () {
    // hiện thị lưới mới
    displayGrid(SIZE);
    startid = undefined;
    endid = undefined;
  });

  // hàm xem xem thuật toán nào đc chọn
  $('select').on('change', function() {
      let choice = this.value;
      if (choice == 1) {
        $(".title h1").text("Breadth First Search");
      } else if (choice == 2) {
        $(".title h1").text("Depth First Search");
      }
      ALGORITHM = choice;
  });

  //oNCLICK HAndle Visualization [[[[[[Start]]]]]]]
  $("#start").on("click", function () {
    if (startid == undefined || endid == undefined) {
      alert("Bạn chưa nhập nút bắt đầu hoặc đích.");
    } else {
      //tạo các vật cản trong lưới
      wallGenerate();
      //để thiết lập các kết nối giữa các ô trong lưới
      connectArray(SIZE);
      //Vô hiệu hóa các trường input
      $("#wall").prop("disabled", true);
      $("#clear").prop("disabled", true);
      $("#size").prop("disabled", true);
      $("#speed").prop("disabled", true);
      $("#start").prop("disabled", true);
      //chạy giải thuật tìm kiếm theo thuật toán đã chọn
      decoder(ALGORITHM);
    }
  });

  //hàm xem là người dùng chọn thuật toán nào
  function decoder(algo) {
    SPEED = 6 - SPEED;
    if (algo == 1) {
      BreadthFirstSearch(data,startid,endid,SPEED);
    } else if (algo == 2) {
      DepthFirstSearch(data,startid,endid,SPEED);
    }
  }

  $("body").on("dblclick", ".unit", function () {
    if (startid == undefined) {
      //Thêm lớp "target" cho phần tử được kích hoạt sự kiện để đánh dấu nó là điểm bắt đầu.
      $(this).addClass("target");
      //Gán giá trị id của phần tử đó cho biến startid để lưu trữ nút bắt đầu
      startid = $(this).attr("id");
    } else if (endid == undefined) {
      //Thêm lớp "target" cho phần tử được kích hoạt sự kiện để đánh dấu nó là điểm kết thúc.
      $(this).addClass("target");
      //Gán giá trị id của phần tử đó cho biến startid để lưu trữ nút kết thúc
      endid = $(this).attr("id");
    } else {
      //pass;
    }
  });

  //hàm xoá
  $("#clear").on("click", function () {
    // xoá nút bắt đầu
    startid = undefined;
    // xoá nút kết thúc
    endid = undefined;
    // xoá nút tường
    wall = [];
    //Thêm lớp "restore" để khôi phục trạng thái gốc
    $(".unit").addClass("restore");
    //Khởi tạo lại biến data 
    data = new Array(2);
    // loại bỏ các lớp khỏi các ptu có lớp unit
    $(".unit").removeClass("animate");
    $(".unit").removeClass("target");
    $(".unit").removeClass("wall");
    $(".unit").removeClass("path");
  });

  
  $("body").on("mousedown", ".unit", function () {
    //để đánh dấu rằng nút chuột đang được giữ.
    isDown = true;
  });

  $("body").on("mouseup", ".unit", function () {
    // để đánh dấu rằng nút chuột không còn được giữ.
    isDown = false;
  });
  //khi click chuột
  $("body").on("mouseover", ".unit", function () {
    if (isDown && $(this).css("background-color") != "rgb(38, 38, 38)") {
      // nếu là tường
      if ($(this).css("background-color") === "rgb(1, 110, 253)") {
        //thêm lớp restore
        $(this).addClass("restore");
        //bỏ lớp wall
        $(this).removeClass("wall");
      } else {
        $(this).addClass("wall");
        $(this).removeClass("restore");
      }
    }
  });

  //random ô nào đc tạo thành tường
  $("#wall").on("click", function () {
    wall = 0;
    for (let i = 0; i < SIZE * SIZE; i++) {
      if (i == startid || i == endid) {
        //pass
      } else {
        let x = Math.round(Math.random() * 10);
        if (x == 0 || x == 1 || x == 2) {
          // add class wall
          $("#" + i).addClass("wall");
        }
      }
    }
  });

  //tạo danh sách các ô chứa vật cản trong lưới
  function wallGenerate() {
    wall = [];
    for (let i = 0; i < SIZE * SIZE; i++) {
      //Với mỗi ô, lấy giá trị màu nền của phần tử có id tương ứng
      let x = $("#" + i).css("background-color");
      // kiểm tra xem có phải là tường ko
      if (x == "rgb(1, 110, 253)") {
        wall.push(i);
      }
    }
  }

  //khởi tạo và kết nối mảng 2 chiều
  function connectArray(size) {
    uniqueId = 0;

    //Tạo mảng 2 chiều, mỗi phần tử trong mảng sẽ là một mảng con có độ dài 2.
    for (let i = 0; i < size; i++) {
      data[i] = new Array(2);
    }

    //Khởi tạo các phần tử trong mảng
    for (let i = 0; i < size; i++) {
      for (let j = 0; j < size; j++) {
        // ktra xem có phải là tường ko
        if(wall.indexOf(uniqueId)==-1){
          data[i][j] = new Spot(i, j, false, uniqueId++);
        }else{
          data[i][j] = new Spot(i, j, true, uniqueId++);
        }
      }
    }
    //Duyệt qua từng hàng và cột trong lưới, gọi phương thức connectFrom trên mỗi ô để kết nối ô đó với các ô láng giềng trong
    for (let i = 0; i < size; i++) {
      for (let j = 0; j < size; j++) {
        data[i][j].connectFrom(data);
      }
    }
  }

    //ạo ra đối tượng Spot
    function Spot(i,j,isWall,id){
      this.i = i;
      this.j = j;
      this.id = id;
      this.isWall = isWall;
      this.neighbors = [];
      this.path = [];
      this.visited = false;
      this.distance = Infinity;
      this.heuristic = 0;
      this.function = this.distance + this.heuristic;
      this.source = "";

      this.connectFrom = function(data){
          var i = this.i;
          var j = this.j;
          // ktra các ô kề có phải là tường ko nếu ko thì thêm vào neighbors
          if(i>0 && !(data[i-1][j].isWall)){
              this.neighbors.push(data[i-1][j])
          }
          if(i<SIZE-1 && !(data[i+1][j].isWall)){
              this.neighbors.push(data[i+1][j])
          }
          if(j>0 && !(data[i][j-1].isWall)){
              this.neighbors.push(data[i][j-1])
          }
          if(j<SIZE-1 && !(data[i][j+1].isWall)){
              this.neighbors.push(data[i][j+1])
          }
      }

  }
});

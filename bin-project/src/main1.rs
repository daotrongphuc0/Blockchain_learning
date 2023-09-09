#[derive(debug)] // khoi tao trinh de bug

fn getowner32(a:i32){
    println!("{}",a);
}

fn getowner(s:String){  //fn getowner(s:&String){
    //fn getowner(s:&mut String){
    println!("{}",s);
}
struct Sudent{
    name : String,
    age : i32,
}

impl Student{
    fn display(s:String)->Self{
        println!("{}",s);
    }
}

fn main(){
    let  a  = 8;
    println!("{}",a);
    let sss1 = Student{
        name : "DTP".to_string(),
        age: 21,
    };
    println!("{:?}",sss1); // debug
    

    let a =String::from("hello");
    getowner(s); //s nam trong heap, do s co the bien doi tang giam size
    println!("{}",s); // s da bi mat vi s da bi truyen cho function
    // tranh  loi bang cach sd flowing(&) giongtruyen tham chieu trong c++
    //getowner(&s);
    // neu tren ham truyen kieu mutitable thi ms co the thay doi
    //let mut a  = 8;
    // chi co 1 mut dc sua doi tai 1 thoi diem duy nhat



    /// du lieu k hop khi ra khoi scope



}
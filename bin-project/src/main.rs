fn add(a: i32 , b:i32) -> i32{
    a+b
}
// tim hiue stack va heap(lien quan den bo nho)
// ownership va borrowing

//option<i32>
/// tra ve 2 kieu dl 
/// 1 la None
/// 2 laf Some(8)

//Result<Ok,Err>



//coment 
/// mo ta document
enum ABC{   // giong struct
    ten(String),
    tuoi,
}
fn main() {
    // khai bao bien 
    let a:i32 =18;
    let b:i32;

    if a < 10 {

    }else if a <20{

    }else {}

    println!("Hello, world!");
    println!("{}",a);

    // ownership
    let a = 10;

    {
        let b =  5;// chi ton tai trong ngoac
    }
    // b o day k ton tai
    let s1 = String::from("hello");
    let s2 =s1; // du lieu s1 se chuyen sang s2,
    //              va  s1 k ton tai nua
    println!("{}",s1);// error
    let s2 =s1.clone();  //neu muon copy, tuc la lay du lieu tu s1 va clone ra 

}

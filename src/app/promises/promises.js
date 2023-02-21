const promise1 = Promise.resolve(3);
const promise2 = Promise.resolve("2"); // 500 hata kodu ile yada 400 hata kodları ile bir dönüş aldınız
const promise3 = new Promise((resolve, reject) => {
  setTimeout(resolve, 1000, "foo");
});

// zincir olmadan çağırdık
promise3.then((res3) => {
  console.log("res3", res3);
});

promise1.then((res) => {
  console.log("res1", res);
});

promise2.then((res2) => {
  console.log("res2", res2);
});

// promise chain işlemi yaptık
// hatanın olduğu yerde kod kısa devre yapar.
//sonuç hatalı bir şekilde döner fakat hata öncesi tüm işlemler uygulanır.
// promise chain sayesinde sıralı işlem yapmaya olan sağlıyor
promise1
  .then((res1) => {
    console.log("1", res1);
    return promise3;
  })
  .then((res2) => {
    console.log("2", res2);
    return promise2;
  })
  .then((res3) => {
    console.log("3", res3);
  })
  .catch((err) => {
    console.log("err", err);
  });

// forkjoin

Promise.all([promise1, promise2, promise3])
  .then((values) => {
    console.log(values);
  })
  .catch((err) => {
    console.log("err", err);
  });

// Expected output: Array [3, 42, "foo"]

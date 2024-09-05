const productPrice = 1500;
const deliveryCosts = {
    "الجزائر": 400,
    "الجزائر إكسبريس": 600,
    "البليدة": 600,
    "بومرداس": 600,
    "بويرة": 650,
    "باتنة": 750,
    "بجاية": 750,
    "قسنطينة": 750,
    "الشلف": 750,
    "ميلة": 750,
    "وهران": 750,
    "سكيكدة": 750,
    "تيزي وزو": 750,
    "المدية": 750,
    "سيف": 750,
    "جيجل": 800,
    "عين دفلة": 800,
    "قالمة": 800,
    "تيسمسيلت": 800,
    "تيارت": 800,
    "تبسة": 900,
    "ريليزي": 800,
    "أم البواقي": 800,
    "المستغانم": 800,
    "عين تموشنت": 800,
    "الطارف": 800,
    "تلمسان": 800,
    "سوق أهراس": 800,
    "سيدي بلعباس": 800,
    "الاغواط": 900,
    "سعيدة": 800,
    "غرداية": 900,
    "الوادي": 900,
    "الجلفة": 900,
    "بسكرة": 900,
    "تقرت": 900,
    "ورقلة": 900,
    "بشار": 1000,
    "المغير": 900,
    "البيض": 1000,
    "أولاد جلال": 900,
    "النعامة": 1000,
    "المنيعة": 950,
    "بني عباس": 1100,
    "تيميمون": 1200,
    "أدرار": 1200,
    "عين صلاح": 1500,
    "تندوف": 1700
};

function updateTotals() {
    const quantity = parseInt(document.getElementById('quantity').value, 10) || 1;
    const city = document.getElementById('city').value;
    let deliveryCost = 0;

    // تحديد تكلفة التوصيل بناءً على المدينة
    if (city && deliveryCosts[city] !== undefined) {
        deliveryCost = deliveryCosts[city];
    } else {
        deliveryCost = 0; // أو قيمة افتراضية إذا كانت المدينة غير محددة
    }

    // حساب الإجمالي
    const total = (productPrice * quantity) + deliveryCost;

    // تحديث القيم في النموذج
    document.getElementById('deliveryCost').value = deliveryCost > 0 ? deliveryCost + ' دج' : 'سعر التوصيل ';
    document.getElementById('total').value = total + ' دج';
}

function changeImage(src) {
    document.getElementById('currentImage').src = src;
}

function setCurrentDateTime() {
    var now = new Date();
    var todayDate = now.toLocaleDateString('EG'); // استخدام التاريخ المحلي في الصيغة العربية
    var time = now.toLocaleTimeString('EG', { hour12: false }); // استخدام الوقت بصيغة 24 ساعة
  
    // تعيين تاريخ ووقت الطلب
    document.getElementById('date').value = todayDate;
    document.getElementById('time').value = time;
}

window.onload = function() {
    setCurrentDateTime();
    document.getElementById('quantity').value = 1; // تعيين القيمة الافتراضية إلى 1
    updateTotals(); // تحديث القيم الأولية
};
async function submitOrder(event) {
    event.preventDefault(); // إيقاف الإرسال الافتراضي للنموذج

    // الحصول على معلومات النموذج
    const name = document.getElementById('name').value.trim();
    const phone = document.getElementById('phone').value.trim();
    const city = document.getElementById('city').value.trim();
    const address = document.getElementById('address').value.trim();
    const quantity = parseInt(document.getElementById('quantity').value, 10);
    const deliveryCost = document.getElementById('deliveryCost').value.trim();
    const total = document.getElementById('total').value.trim();
    const date = document.getElementById('date').value.trim();
    const time = document.getElementById('time').value.trim();
    const productName = document.getElementById('productName').value.trim();

    // التحقق من أن الكمية أكبر من 0
    if (quantity <= 0) {
        alert("يرجى إدخال كمية صحيحة أكبر من 0");
        return; // إيقاف تنفيذ الدالة
    }

    // التحقق من أن جميع الحقول غير فارغة
    if (!name || !phone || !city || !address || !productName) {
        alert("يرجى ملء جميع الحقول.");
        return;
    }

    // إرسال البيانات إلى Google Apps Script
    const formData = new FormData();
    formData.append('product-id', 'product-id-value');
    formData.append('name', name);
    formData.append('phone', phone);
    formData.append('city', city);
    formData.append('address', address);
    formData.append('quantity', quantity);
    formData.append('deliveryCost', deliveryCost);
    formData.append('total', total);
    formData.append('date', date);
    formData.append('time', time);
    formData.append('productName', productName);
  
    try {
        const response = await fetch('https://script.google.com/macros/s/AKfycbyipcoqqRFSG60QhUcNCO4T32BwwdVq9xpU3LAnfr5esggXG8F25FeMYwOn0aBaMZBK/exec', {
            method: 'POST',
            body: formData
        });

        if (!response.ok) {
            throw new Error('Network response was not ok.');
        }

        // إعادة توجيه المستخدم إلى صفحة معلومات الطلب
        window.location.href = 'order-info.html?' + new URLSearchParams({
            name,
            phone,
            city,
            address,
            quantity,
            deliveryCost,
            total,
            date,
            time,
            productName
        }).toString();
    } catch (error) {
        console.error('Error:', error);
        alert('حدث خطأ أثناء إرسال الطلب. يرجى المحاولة مرة أخرى.');
    }
}

// Constants for product price and delivery costs
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

// Function to update the delivery cost and total based on quantity and city
function updateTotals() {
    const quantity = parseInt(document.getElementById('quantity').value, 10) || 1;
    const city = document.getElementById('city').value;
    let deliveryCost = 0;

    // Determine delivery cost based on city
    if (city && deliveryCosts[city] !== undefined) {
        deliveryCost = deliveryCosts[city];
    } else {
        deliveryCost = 0; // Default cost if city is not found
    }

    // Calculate total price
    const total = (productPrice * quantity) + deliveryCost;

    // Update form fields with the calculated values
    document.getElementById('deliveryCost').value = deliveryCost > 0 ? `${deliveryCost} دج` : 'سعر التوصيل غير محدد';
    document.getElementById('total').value = `${total} دج`;
}

// Function to update the date and time fields
function updateDateTimeFields() {
    const now = new Date();
    const todayDate = now.toLocaleDateString('EG');
    const currentTime = now.toLocaleTimeString('EG', { hour12: false });

    document.getElementById('date').value = todayDate;
    document.getElementById('time').value = currentTime;
}

// Function to handle form submission
async function submitOrder(event) {
    event.preventDefault(); // Prevent the default form submission

    const now = new Date();
    const todayDate = now.toLocaleDateString('ar-EG');
    const currentTime = now.toLocaleTimeString('ar-EG', { hour12: false });

    const dateField = document.getElementById('date');
    const timeField = document.getElementById('time');

    // Retrieve form values
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

    // Validate quantity
    if (quantity <= 0) {
        alert("يرجى إدخال كمية صحيحة أكبر من 0");
        return;
    }

    // Validate that all required fields are filled
    if (!name || !phone || !city || !address || !productName) {
        alert("يرجى ملء جميع الحقول.");
        return;
    }

    // Prepare data to send
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

        // Clear form fields
        document.getElementById('name').value = '';
        document.getElementById('phone').value = '';
        document.getElementById('city').value = '';
        document.getElementById('address').value = '';
        document.getElementById('quantity').value = '';
        document.getElementById('deliveryCost').value = '';
        document.getElementById('total').value = '';
        document.getElementById('date').value = '';
        document.getElementById('time').value = '';
        document.getElementById('productName').value = '';

        // Redirect to order info page
        window.location.href = 'https://hassannben.github.io/lilirop/order-info.html?' + new URLSearchParams({
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

// Function to handle image change
function changeImage(src) {
    document.getElementById('currentImage').src = src;
}

// Function to handle video modal display
document.getElementById('videoButton').onclick = function() {
    document.getElementById('videoModal').style.display = 'block';
}

document.querySelector('.close').onclick = function() {
    document.getElementById('videoModal').style.display = 'none';
}

window.onclick = function(event) {
    if (event.target == document.getElementById('videoModal')) {
        document.getElementById('videoModal').style.display = 'none';
    }
}

// Ensure date and time fields are updated on page load
updateDateTimeFields();

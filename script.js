// Toggle menu visibility
function toggleMenu() {
    const menu = document.getElementById('menu-items');
    menu.classList.toggle('active'); // Thêm hoặc bỏ class 'active'
}



function calculateTotal(group) {
    let total = 0;
    for (let i = 0; i < group.length; i++) {
        let questionName = 'question' + group[i];
        let radios = document.getElementsByName(questionName);
        for (let radio of radios) {
            if (radio.checked) {
                total += parseInt(radio.value);
            }
        }
    }
    return total;
}


function calculateTotalPoints(event) {
    // Kiểm tra các câu trả lời
    if (!checkAnswers()) {
        alert("Bạn cần trả lời tất cả các câu hỏi trước khi gửi!");
        return;  // Dừng hàm nếu có câu chưa trả lời
    }
    if (event) {
        event.preventDefault();
    }
    // Danh sách nhóm câu hỏi
    let groups = [
        { name: "Realistic (R)", questions: [1, 2, 3, 4] },
        { name: "Investigative (I)", questions: [5,6,7,8] },
        { name: "Artistic (A)", questions: [9,10,11,12] },
        { name: "Social (S)", questions: [13,14,15,16] },
        { name: "Enterprising (E)", questions: [17,18,19,20] },
        { name: "Conventional (C)", questions: [21,22,23,24] }
    ];

    // Tính tổng điểm cho từng nhóm
    let scores = groups.map(group => {
        return { name: group.name, score: calculateTotal(group.questions) };
    });

    // Tìm nhóm có tổng điểm cao nhất
    let highestGroup = scores.reduce((max, group) => {
        return group.score > max.score ? group : max;
    }, scores[0]);

    let groupScoresText = scores
    .filter(group => group.name !== highestGroup.name) // Lọc nhóm có điểm cao nhất
    .map(group => {
        return `<p><b>${group.name}:</b> ${group.score}</p>`;
    })
    .join("");

    // Hiển thị popup
    showPopup(highestGroup,groupScoresText);
}


function showPopup(highestGroup,groupScoresText) {
    // Danh sách mô tả và ngành nghề cho từng nhóm
    const descriptions = {
        "Realistic (R)": {
            description: "Nhóm người thực tế, thích các công việc tay chân, kỹ thuật, vận hành máy móc.",
            careers: ["Kỹ sư cơ khí", "Thợ mộc", "Kỹ thuật viên", "Chuyên gia nông nghiệp"]
        },
        "Investigative (I)": {
            description: "Nhóm người yêu thích tìm tòi, phân tích, và nghiên cứu.",
            careers: ["Nhà nghiên cứu khoa học", "Bác sĩ", "Chuyên viên dữ liệu", "Kỹ sư phần mềm"]
        },
        "Artistic (A)": {
            description: "Nhóm người sáng tạo, yêu nghệ thuật và tự do thể hiện bản thân.",
            careers: ["Nhà thiết kế đồ họa", "Nhạc sĩ", "Họa sĩ", "Nhà văn"]
        },
        "Social (S)": {
            description: "Nhóm người thân thiện, thích giao tiếp và giúp đỡ người khác.",
            careers: ["Giáo viên", "Nhân viên xã hội", "Bác sĩ tâm lý", "Chuyên gia nhân sự"]
        },
        "Enterprising (E)": {
            description: "Nhóm người năng động, thích quản lý và lãnh đạo.",
            careers: ["Doanh nhân", "Quản lý dự án", "Chuyên viên marketing", "Luật sư"]
        },
        "Conventional (C)": {
            description: "Nhóm người cẩn thận, yêu thích sự ổn định và làm việc chi tiết.",
            careers: ["Kế toán", "Nhân viên hành chính", "Quản trị cơ sở dữ liệu", "Thủ thư"]
        }
    };

    // Lấy thông tin chi tiết của nhóm
    const groupInfo = descriptions[highestGroup.name];

    // Nội dung hiển thị trong popup
    const message = `
        <h3>Kết quả: ${highestGroup.name}</h3>
        <p><b>Mô tả:</b> ${groupInfo.description}</p>
        <p><b>Ngành nghề phù hợp:</b></p>
        <ul>
            ${groupInfo.careers.map(career => `<li>${career}</li>`).join("")}
        </ul>
        <p><b>Tổng điểm:</b> ${highestGroup.score}</p>
        <p><b>Điểm các nhóm khác:</b></p>
        ${groupScoresText}
    `;
    document.getElementById('popupMessage').innerHTML = message;
    document.getElementById('popup').style.display = 'block';
    document.getElementById('overlay').style.display = 'block';
}

function closePopup() {
    document.getElementById('popup').style.display = 'none';
    document.getElementById('overlay').style.display = 'none';
}





function checkAnswers() {
    for (let i = 1; i <= 24; i++) {
        let question = document.getElementsByName('question' + i);
        let answered = false;
        for (let j = 0; j < question.length; j++) {
            if (question[j].checked) {
                answered = true;
                break;
            }
        }
        if (!answered) {
            return false; // Nếu có câu chưa được trả lời, trả về false
        }
    }
    return true; // Nếu tất cả các câu đều đã được trả lời, trả về true
}



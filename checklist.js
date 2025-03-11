document.addEventListener('DOMContentLoaded', function() {
    var checklistItemsDiv = document.getElementById('checklist-items');
    var calculateButton = document.getElementById('calculate-button');
    var printButton = document.getElementById('print-button');
    var resultsArea = document.getElementById('results-area');
    var resultsDetailsDiv = document.getElementById('results-details');
    var totalScoreDiv = document.getElementById('total-score');
    var scoreRatingDiv = document.getElementById('score-rating');
    var remindersDiv = document.getElementById('reminders');

    var checklistData = initializeChecklistItems();
    var levelOptions = getLevelOptions();

    function initializeChecklistItems() {
        return [
            {"category": "一、行前準備 (總分: 50)", "item": "機票訂購", "max_score": 15, "user_score": 0, "level": null, "cloudLink": "https://drive.google.com/file/d/1t8VWflwjXzveSxxoeW_YhufGiXK9oRZH/view?usp=drive_link"}, // 範例雲端連結，請替換
            {"category": "一、行前準備 (總分: 50)", "item": "住宿預訂", "max_score": 15, "user_score": 0, "level": null, "cloudLink": "YOUR_CLOUD_LINK_FOR_住宿預訂"}, // 範例雲端連結，請替換
            {"category": "一、行前準備 (總分: 50)", "item": "簽證/入境許可 (如適用)", "max_score": 10, "user_score": 0, "level": null, "cloudLink": "YOUR_CLOUD_LINK_FOR_簽證"}, // 範例雲端連結，請替換
            {"category": "一、行前準備 (總分: 50)", "item": "行程初步規劃", "max_score": 5, "user_score": 0, "level": null, "cloudLink": "YOUR_CLOUD_LINK_FOR_初步規劃"}, // 範例雲端連結，請替換
            {"category": "一、行前準備 (總分: 50)", "item": "交通方式研究", "max_score": 5, "user_score": 0, "level": null, "cloudLink": "YOUR_CLOUD_LINK_FOR_交通研究"}, // 範例雲端連結，請替換

            {"category": "二、行程細節規劃 (總分: 40)", "item": "每日詳細行程", "max_score": 10, "user_score": 0, "level": null, "cloudLink": "YOUR_CLOUD_LINK_FOR_每日行程"}, // 範例雲端連結，請替換
            {"category": "二、行程細節規劃 (總分: 40)", "item": "餐廳/美食研究", "max_score": 8, "user_score": 0, "level": null, "cloudLink": "YOUR_CLOUD_LINK_FOR_餐廳美食"}, // 範例雲端連結，請替換
            {"category": "二、行程細節規劃 (總分: 40)", "item": "景點門票/活動預訂", "max_score": 8, "user_score": 0, "level": null, "cloudLink": "YOUR_CLOUD_LINK_FOR_門票預訂"}, // 範例雲端連結，請替換
            {"category": "二、行程細節規劃 (總分: 40)", "item": "交通票券購買/儲值", "max_score": 7, "user_score": 0, "level": null, "cloudLink": "YOUR_CLOUD_LINK_FOR_交通票券"}, // 範例雲端連結，請替換
            {"category": "二、行程細節規劃 (總分: 40)", "item": "網路/通訊準備", "max_score": 7, "user_score": 0, "level": null, "cloudLink": "YOUR_CLOUD_LINK_FOR_網路通訊"}, // 範例雲端連結，請替換

            {"category": "三、行前雜項準備 (總分: 30)", "item": "行李清單", "max_score": 6, "user_score": 0, "level": null, "cloudLink": "YOUR_CLOUD_LINK_FOR_行李清單"}, // 範例雲端連結，請替換
            {"category": "三、行前雜項準備 (總分: 30)", "item": "天氣查詢與穿著準備", "max_score": 6, "user_score": 0, "level": null, "cloudLink": "YOUR_CLOUD_LINK_FOR_天氣穿著"}, // 範例雲端連結，請替換
            {"category": "三、行前雜項準備 (總分: 30)", "item": "貨幣兌換", "max_score": 5, "user_score": 0, "level": null, "cloudLink": "YOUR_CLOUD_LINK_FOR_貨幣兌換"}, // 範例雲端連結，請替換
            {"category": "三、行前雜項準備 (總分: 30)", "item": "緊急聯絡資訊", "max_score": 5, "user_score": 0, "level": null, "cloudLink": "YOUR_CLOUD_LINK_FOR_緊急聯絡"}, // 範例雲端連結，請替換
            {"category": "三、行前雜項準備 (總分: 30)", "item": "旅遊保險 (建議)", "max_score": 4, "user_score": 0, "level": null, "cloudLink": "YOUR_CLOUD_LINK_FOR_旅遊保險"}, // 範例雲端連結，請替換
            {"category": "三、行前雜項準備 (總分: 30)", "item": "下載實用App", "max_score": 4, "user_score": 0, "level": null, "cloudLink": "YOUR_CLOUD_LINK_FOR_下載App"}  // 範例雲端連結，請替換
        ];
    }

    function getLevelOptions() {
        return {
            "1": {"name": "未完成", "score_percentage": 0},
            "2": {"name": "完成", "score_percentage": 100}
        };
    }

    function renderChecklistItems() {
        var currentCategory = null;
        checklistData.forEach(itemData => {
            if (itemData.category !== currentCategory) {
                var categoryDiv = document.createElement('div');
                categoryDiv.className = 'checklist-category';
                categoryDiv.textContent = itemData.category;
                checklistItemsDiv.appendChild(categoryDiv);
                currentCategory = itemData.category;
            }

            var itemDiv = document.createElement('div');
            itemDiv.className = 'checklist-item';
            itemDiv.textContent = `${itemData.item} (${itemData.max_score}分)`;

            // 新增連結圖示
            var linkIcon = document.createElement('a');
            linkIcon.href = itemData.cloudLink;
            linkIcon.target = "_blank"; // 在新分頁打開連結
            var iconImg = document.createElement('img');
            iconImg.src = 'link-icon.png'; // 請將您的連結圖示圖片命名為 link-icon.png 並放在與 checklist.html 同目錄下
            iconImg.alt = '相關資料';
            iconImg.className = 'item-link';
            linkIcon.appendChild(iconImg);
            itemDiv.appendChild(linkIcon);


            var levelOptionsDiv = document.createElement('div');
            levelOptionsDiv.className = 'level-options';

            var levelKeys = Object.keys(levelOptions);
            for (var i = 0; i < levelKeys.length; i++) {
                var levelKey = levelKeys[i];
                var level = levelOptions[levelKey];
                var radioId = `${itemData.item.replace(/[^a-zA-Z0-9]/g, '')}-${levelKey}`;
                var radioLabel = document.createElement('label');
                var radioInput = document.createElement('input');
                radioInput.type = 'radio';
                radioInput.name = itemData.item.replace(/[^a-zA-Z0-9]/g, '');
                radioInput.value = levelKey;
                radioInput.id = radioId;

                radioLabel.textContent = level.name;
                radioLabel.setAttribute('for', radioId);

                levelOptionsDiv.appendChild(radioInput);
                levelOptionsDiv.appendChild(radioLabel);
            }
            itemDiv.appendChild(levelOptionsDiv);
            checklistItemsDiv.appendChild(itemDiv);
        });
    }

    function calculateResults() {
        checklistData.forEach(itemData => {
            var itemNameNoSpace = itemData.item.replace(/[^a-zA-Z0-9]/g, '');
            var selectedLevelKey = document.querySelector(`input[name="${itemNameNoSpace}"]:checked`);

            if (selectedLevelKey) {
                var levelKey = selectedLevelKey.value;
                var selectedLevel = levelOptions[levelKey];
                if (selectedLevel) {
                    itemData.level = selectedLevel.name;
                    itemData.user_score = parseInt(itemData.max_score * selectedLevel.score_percentage / 100);
                } else {
                    console.log(`找不到 Level Key: ${levelKey} 在 levelOptions 中`); // 移除 console.log 除錯訊息
                }
            } else {
                itemData.level = "未完成";
                itemData.user_score = 0;
                 // 移除 console.log 除錯訊息
            }
        });

        displayResults();
    }


    function displayResults() {
        var totalScore = 0;
        var resultsDetailsHTML = '';
        var reminders = [];

        checklistData.forEach(itemData => {
            totalScore += itemData.user_score;
            var itemClass = ""; // Default class
            if (itemData.level === "未完成") {
                itemClass = "item-incomplete"; // Add class for incomplete items
                reminders.push(itemData.item);
            } else if (itemData.level === "未選擇") {
                itemClass = "item-incomplete"; // Also highlight "未選擇" if needed
                reminders.push(`${itemData.item} (未選擇等級)`);
            }
            resultsDetailsHTML += `<p class="${itemClass}">- ${itemData.item}: <span class="level-status">(${itemData.level})</span> - ${itemData.user_score} 分 (滿分 ${itemData.max_score})</p>`; // Display level and apply class
        });

        var scoreRating = getScoreRating(totalScore);

        resultsDetailsDiv.innerHTML = resultsDetailsHTML;
        totalScoreDiv.textContent = `總分: ${totalScore} / ${checklistData.reduce((sum, item) => sum + item.max_score, 0)}`;
        scoreRatingDiv.textContent = `分數評級: ${scoreRating}`;

        if (reminders.length > 0) {
            remindersDiv.innerHTML = `<h3>提醒事項 (未完成或未選擇項目):</h3><ul>${reminders.map(item => `<li>- ${item}</li>`).join('')}</ul>`;
        } else {
            remindersDiv.textContent = "沒有未完成或未選擇項目。";
        }

        resultsArea.style.display = 'block';
    }

    function getScoreRating(totalScore) {
        var maxTotalScore = checklistData.reduce((sum, item) => sum + item.max_score, 0);
        var percentageScore = (totalScore / maxTotalScore) * 120;

        if (percentageScore >= 100) {
            return "完美準備!";
        } else if (percentageScore >= 80) {
            return "良好準備!";
        } else if (percentageScore >= 60) {
            return "尚可準備!";
        } else {
            return "準備不足!";
        }
    }

    function printChecklist() {
        window.print();
    }

    renderChecklistItems();
    calculateButton.addEventListener('click', calculateResults);
    printButton.addEventListener('click', printChecklist);

});
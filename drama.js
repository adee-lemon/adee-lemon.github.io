// Database of Wang Yuwen's works
const dramas = [
    {
        title: "The Love You Give Me (你给我的喜欢 - 2023)",
        genres: ["romance", "modern"],
        score: 7.2,
        desc: "Co-parenting romance and second-chance love story alongside Wang Ziqi."
    },
    {
        title: "Once We Get Married (只是结婚的关系 - 2021)",
        genres: ["romance", "modern"],
        score: 6.7,
        desc: "A witty contract marriage comedy between a fashion buyer and a bossy CEO."
    },
    {
        title: "You Are My Lover Friend (舍不得星星 - 2024)",
        genres: ["romance", "modern"],
        score: 6.9,
        desc: "High school friends transition into urban romance and workplace colleagues."
    },
    {
        title: "Secret of the Three Kingdoms (三国机密 - 2018)",
        genres: ["historical"],
        score: 6.5,
        desc: "Han dynasty royal court intrigue, secrets, and high-stakes power strategies."
    },
    {
        title: "Worthy of Love / My Page in the 90s (2026)",
        genres: ["historical", "romance"],
        score: 7.0,
        desc: "A nostalgic retro romance set during the vibrant transformations of 1990s China."
    },
    {
        title: "Novoland: Castle in the Sky 2 (九州·天空城II - 2020)",
        genres: ["fantasy", "historical", "romance"],
        score: 5.6,
        desc: "High fantasy romance centering around a golden-winged empress."
    },
    {
        title: "Tiger and Crane (虎鹤妖师录 - 2023)",
        genres: ["fantasy", "martialarts"],
        score: 6.2,
        desc: "Master demon slayers and mythical beings confronting threats to the mortal realm."
    },
    {
        title: "Blade of Vengeance (2026)",
        genres: ["martialarts", "historical"],
        score: 7.5,
        desc: "A martial arts narrative following determined warriors across the jianghu."
    }
];

let selectedMinScore = 'all';

// Rating Pill Filter Handler
function filterByPill(score, btnElement) {
    selectedMinScore = score;
    
    // Highlight the selected badge button
    document.querySelectorAll('.pill').forEach(btn => btn.classList.remove('active'));
    btnElement.classList.add('active');

    // Run filter automatically
    performSearch();
}

// Search and DOM Rendering Function
function performSearch() {
    // 1. Gather all checked checkbox values
    const checkedBoxes = document.querySelectorAll('input[name="genre"]:checked');
    const selectedGenres = Array.from(checkedBoxes).map(cb => cb.value);

    // 2. Filter dataset based on genre matching and score threshold
    const filteredResults = dramas.filter(item => {
        const matchesGenre = item.genres.some(genre => selectedGenres.includes(genre));
        const matchesScore = (selectedMinScore === 'all') || (item.score >= selectedMinScore);
        return matchesGenre && matchesScore;
    });

    // 3. Render into the DOM placeholder
    const outputContainer = document.getElementById('searchResults');
    
    // Guard against null container
    if (!outputContainer) return;

    if (filteredResults.length === 0) {
        outputContainer.innerHTML = '<p style="color: #64748b; font-style: italic; padding: 12px 0;">No dramas match your selected genres and minimum rating threshold.</p>';
        return;
    }

    outputContainer.innerHTML = filteredResults.map(item => `
        <div class="drama-card">
            <div class="drama-card-header">
                <h3>${item.title}</h3>
                <span class="score-tag">豆瓣 ${item.score}</span>
            </div>
            <div class="drama-meta">
                <strong>Tags:</strong> ${item.genres.map(g => g.charAt(0).toUpperCase() + g.slice(1)).join(', ')}
            </div>
            <p class="drama-desc">${item.desc}</p>
        </div>
    `).join('');
}

// Automatically render cards on initial page load
performSearch();
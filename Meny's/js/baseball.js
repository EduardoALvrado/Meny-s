// Datos del Baseball
const baseballData = {
    teams: [
        {
            id: 1,
            name: "Leones",
            city: "Ciudad Central",
            logo: "[LION]",
            wins: 12,
            losses: 5,
            runsFor: 145,
            runsAgainst: 98
        },
        {
            id: 2,
            name: "Aguilas",
            city: "Sierra Alta",
            logo: "[EAGLE]",
            wins: 10,
            losses: 7,
            runsFor: 132,
            runsAgainst: 108
        },
        {
            id: 3,
            name: "Tigres",
            city: "Zona Este",
            logo: "[TIGER]",
            wins: 9,
            losses: 8,
            runsFor: 128,
            runsAgainst: 115
        },
        {
            id: 4,
            name: "Osos",
            city: "Montaña",
            logo: "[BEAR]",
            wins: 8,
            losses: 9,
            runsFor: 110,
            runsAgainst: 125
        }
    ],
    players: [
        {
            id: 1,
            name: "Juan Rodriguez",
            team: "Leones",
            number: 24,
            position: "Bateador",
            average: 0.315,
            homeRuns: 18,
            rbis: 67
        },
        {
            id: 2,
            name: "Carlos Sanchez",
            team: "Aguilas",
            number: 7,
            position: "Lanzador",
            wins: 14,
            strikeouts: 142,
            era: 2.45
        },
        {
            id: 3,
            name: "Miguel Gonzalez",
            team: "Tigres",
            number: 5,
            position: "Jardinero",
            average: 0.298,
            homeRuns: 15,
            rbis: 58
        },
        {
            id: 4,
            name: "Diego Martinez",
            team: "Leones",
            number: 15,
            position: "Infielder",
            average: 0.275,
            homeRuns: 8,
            rbis: 42
        },
        {
            id: 5,
            name: "Roberto Flores",
            team: "Osos",
            number: 9,
            position: "Catcher",
            average: 0.268,
            homeRuns: 12,
            rbis: 51
        },
        {
            id: 6,
            name: "Luis Torres",
            team: "Aguilas",
            number: 3,
            position: "Lanzador",
            wins: 11,
            strikeouts: 118,
            era: 2.78
        }
    ],
    games: [
        {
            id: 1,
            homeTeam: "Leones",
            awayTeam: "Tigres",
            homeScore: 5,
            awayScore: 3,
            date: "2025-12-15",
            time: "19:00",
            status: "Proximo"
        },
        {
            id: 2,
            homeTeam: "Aguilas",
            awayTeam: "Osos",
            homeScore: 7,
            awayScore: 4,
            date: "2025-12-16",
            time: "20:00",
            status: "Proximo"
        },
        {
            id: 3,
            homeTeam: "Tigres",
            awayTeam: "Leones",
            homeScore: 3,
            awayScore: 6,
            date: "2025-12-17",
            time: "19:30",
            status: "Proximo"
        },
        {
            id: 4,
            homeTeam: "Osos",
            awayTeam: "Aguilas",
            homeScore: 2,
            awayScore: 8,
            date: "2025-12-18",
            time: "20:00",
            status: "Proximo"
        }
    ]
};

// Inicializar
document.addEventListener('DOMContentLoaded', function() {
    loadTeams();
    loadStats();
    loadPlayers();
    loadGames();
});

// Cargar equipos
function loadTeams() {
    const grid = document.getElementById('teamsGrid');
    grid.innerHTML = '';

    baseballData.teams.forEach(team => {
        const card = document.createElement('div');
        card.className = 'team-card';
        card.innerHTML = `
            <div class="team-header">
                <div class="team-name">${team.name}</div>
                <div class="team-city">${team.city}</div>
            </div>
            <div class="team-stats">
                <div class="team-stat">
                    <span class="team-stat-label">Victorias</span>
                    <span class="team-stat-value">${team.wins}</span>
                </div>
                <div class="team-stat">
                    <span class="team-stat-label">Derrotas</span>
                    <span class="team-stat-value">${team.losses}</span>
                </div>
                <div class="team-stat">
                    <span class="team-stat-label">Carreras A Favor</span>
                    <span class="team-stat-value">${team.runsFor}</span>
                </div>
                <div class="team-stat">
                    <span class="team-stat-label">Carreras En Contra</span>
                    <span class="team-stat-value">${team.runsAgainst}</span>
                </div>
            </div>
        `;
        grid.appendChild(card);
    });
}

// Cargar estadísticas
function loadStats() {
    const totalGames = baseballData.games.length;
    const totalTeams = baseballData.teams.length;
    const totalPlayers = baseballData.players.length;
    
    let totalRuns = 0;
    baseballData.games.forEach(game => {
        totalRuns += game.homeScore + game.awayScore;
    });

    document.getElementById('totalGames').textContent = totalGames;
    document.getElementById('totalTeams').textContent = totalTeams;
    document.getElementById('totalPlayers').textContent = totalPlayers;
    document.getElementById('totalRuns').textContent = totalRuns;
}

// Cargar jugadores
function loadPlayers() {
    const grid = document.getElementById('playersGrid');
    grid.innerHTML = '';

    baseballData.players.forEach(player => {
        const card = document.createElement('div');
        card.className = 'player-card';
        
        let statsHTML = '';
        if (player.position === 'Bateador' || player.position === 'Jardinero' || player.position === 'Infielder' || player.position === 'Catcher') {
            statsHTML = `
                <div class="player-stat">
                    <span class="player-stat-label">Promedio</span>
                    <span class="player-stat-value">${player.average}</span>
                </div>
                <div class="player-stat">
                    <span class="player-stat-label">Home Runs</span>
                    <span class="player-stat-value">${player.homeRuns}</span>
                </div>
                <div class="player-stat">
                    <span class="player-stat-label">RBIs</span>
                    <span class="player-stat-value">${player.rbis}</span>
                </div>
            `;
        } else {
            statsHTML = `
                <div class="player-stat">
                    <span class="player-stat-label">Victorias</span>
                    <span class="player-stat-value">${player.wins}</span>
                </div>
                <div class="player-stat">
                    <span class="player-stat-label">Strikeouts</span>
                    <span class="player-stat-value">${player.strikeouts}</span>
                </div>
                <div class="player-stat">
                    <span class="player-stat-label">ERA</span>
                    <span class="player-stat-value">${player.era}</span>
                </div>
            `;
        }

        card.innerHTML = `
            <div class="player-header">
                <div class="player-number">Numero ${player.number}</div>
                <div class="player-name">${player.name}</div>
                <div class="player-position">${player.position}</div>
            </div>
            <div class="player-stats">
                <div class="player-stat">
                    <span class="player-stat-label">Equipo</span>
                    <span class="player-stat-value">${player.team}</span>
                </div>
                ${statsHTML}
            </div>
        `;
        grid.appendChild(card);
    });
}

// Cargar juegos
function loadGames() {
    const list = document.getElementById('gamesList');
    list.innerHTML = '';

    if (baseballData.games.length === 0) {
        list.innerHTML = `
            <div class="empty-state">
                <div class="empty-state-icon">[X]</div>
                <div class="empty-state-text">No hay juegos programados</div>
            </div>
        `;
        return;
    }

    baseballData.games.forEach(game => {
        const card = document.createElement('div');
        card.className = 'game-card';
        
        const date = new Date(game.date);
        const dateStr = date.toLocaleDateString('es-ES', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });

        card.innerHTML = `
            <div class="game-team">
                <div class="game-team-name">${game.homeTeam}</div>
                <div class="game-team-score">${game.homeScore}</div>
            </div>
            <div class="game-separator">VS</div>
            <div class="game-team">
                <div class="game-team-name">${game.awayTeam}</div>
                <div class="game-team-score">${game.awayScore}</div>
            </div>
            <div class="game-info">
                <div class="game-date">${dateStr}</div>
                <div class="game-time">${game.time}</div>
                <div class="game-status">${game.status}</div>
            </div>
        `;
        list.appendChild(card);
    });
}

// Volver a inicio
function goBack() {
    window.location.href = '../../index.html';
}

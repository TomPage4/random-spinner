let names = [];
const colors = [
    '#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', 
    '#9966FF', '#FF9F40', '#FF6384', '#36A2EB'
];

function addName() {
    const nameInput = document.getElementById('nameInput');
    const name = nameInput.value.trim();
    
    if (name) {
        names.push(name);
        nameInput.value = '';
        updateWheel();
    }
}

function createConicGradient(total) {
    const angle = 360 / total;
    let gradient = '';
    names.forEach((_, index) => {
        const color = colors[index % colors.length];
        const start = angle * index;
        const end = angle * (index + 1);
        gradient += `${color} ${start}deg ${end}deg${index < total - 1 ? ',' : ''}`;
    });
    return `conic-gradient(${gradient})`;
}

function updateWheel() {
    const wheel = document.getElementById('wheel');
    wheel.innerHTML = '';
    
    if (names.length === 0) return;

    // Create conic gradient background
    wheel.style.background = createConicGradient(names.length);
    
    // Create segments with text
    names.forEach((name, index) => {
        const segment = document.createElement('div');
        segment.className = 'wheel-segment';
        
        const content = document.createElement('div');
        content.className = 'segment-content';
        
        const angle = 360 / names.length;
        const rotation = angle * index + (angle / 2);
        
        content.style.transform = `rotate(${rotation}deg)`;
        content.textContent = name;
        
        segment.appendChild(content);
        wheel.appendChild(segment);
    });
}

function spinWheel() {
    if (names.length === 0) {
        document.getElementById('result').textContent = 'Add some names first!';
        return;
    }
    
    const wheel = document.getElementById('wheel');
    if (wheel.style.transition !== '') return;

    let selectedIndex;
    let selectedName;

    // Check if "Javi" is in the list
    const javiIndex = names.findIndex(name => name.toLowerCase() === 'javi');
    if (javiIndex !== -1) {
        selectedIndex = javiIndex;
        selectedName = names[javiIndex];
    } else {
        selectedIndex = Math.floor(Math.random() * names.length);
        selectedName = names[selectedIndex];
    }

    const spinButton = document.getElementById('spinButton');
    spinButton.disabled = true;

    // Calculate rotation
    const extraSpins = 5;
    const segmentAngle = 360 / names.length;
    const targetAngle = 360 - (selectedIndex * segmentAngle);
    const totalRotation = (360 * extraSpins) + targetAngle;

    wheel.style.transition = 'transform 3s cubic-bezier(0.17, 0.67, 0.12, 0.99)';
    wheel.style.transform = `rotate(${totalRotation}deg)`;

    setTimeout(() => {
        document.getElementById('result').textContent = `Selected: ${selectedName}`;
        names = names.filter(name => name !== selectedName);
        
        setTimeout(() => {
            wheel.style.transition = '';
            updateWheel();
            spinButton.disabled = false;
        }, 100);
    }, 3000);
}

document.getElementById('nameInput').addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        addName();
    }
});
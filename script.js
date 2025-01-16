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

function createSegment(name, index, total) {
    const segment = document.createElement('div');
    segment.className = 'wheel-segment';
    
    // Calculate the angle for this segment
    const segmentAngle = 360 / total;
    const rotationAngle = index * segmentAngle;
    
    // Set the segment's rotation
    segment.style.transform = `rotate(${rotationAngle}deg)`;
    
    // Create the colored content div
    const content = document.createElement('div');
    content.className = 'segment-content';
    content.style.transform = `rotate(${segmentAngle}deg)`;
    content.style.backgroundColor = colors[index % colors.length];
    
    // Create and position the text
    const text = document.createElement('span');
    text.textContent = name;
    text.style.transform = `rotate(${-rotationAngle - segmentAngle/2}deg)`;
    
    content.appendChild(text);
    segment.appendChild(content);
    return segment;
}

function updateWheel() {
    const wheel = document.getElementById('wheel');
    wheel.innerHTML = '';
    
    if (names.length === 1) {
        // Special case for single name - fill the entire wheel
        const segment = document.createElement('div');
        segment.className = 'wheel-segment';
        segment.style.width = '100%';
        segment.style.height = '100%';
        segment.style.backgroundColor = colors[0];
        segment.style.display = 'flex';
        segment.style.alignItems = 'center';
        segment.style.justifyContent = 'center';
        
        const text = document.createElement('span');
        text.textContent = names[0];
        segment.appendChild(text);
        wheel.appendChild(segment);
    } else {
        // Multiple names - create proper segments
        names.forEach((name, index) => {
            const segment = createSegment(name, index, names.length);
            wheel.appendChild(segment);
        });
    }
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
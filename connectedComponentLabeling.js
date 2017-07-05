// ref: http://www.cnblogs.com/Rainlee007/p/6155543.html
// wikipedia two-pass

function connectedComponentLabeling(a) {
    const b = [];

    for(let i =0; i <a.length; i++) {
        b[i] = [];
    }

    const labels = [];
    let label = 1;

    // First pass: if a[i][j] 不为0；左边，上边不存在或都为0，label 增加；否则选取较小的label，并记录 较大label 的parent
    for(let i =0; i <a.length; i++) {
        for(let j=0; j<a[0].length; j++) {
            if(a[i][j] == 0) {
                b[i][j] = 0;
            } else if (( a[i-1] == undefined || a[i-1][j] == 0) && ( a[i][j-1] == undefined || a[i][j-1] == 0)) {
                b[i][j] = label;
                label += 1;
            } else if (a[i-1][j] && a[i-1][j] !== 0 && a[i][j-1] && a[i][j-1] !== 0) {
                smallerLabel = Math.min(b[i-1][j], b[i][j-1]);
                biggerLabel = Math.max(b[i-1][j], b[i][j-1]);
                b[i][j] = smallerLabel;
                labels[biggerLabel] = smallerLabel;
            } else if (a[i-1][j] !== 0 ) {
                b[i][j] = b[i-1][j];
            } else {
                b[i][j] = b[i][j-1];
            }
        }
    }

    // Second pass: find parent label
    for(let i =0; i <a.length; i++) {
        for(let j=0; j<a[0].length; j++) {
            if(b[i][j] !== 0) b[i][j] = findParent(b[i][j], labels);
        }
    }

    function findParent(label, labels) {
        if(!labels[label]) {
            return label;
        } else {
            return findParent(labels[label], labels)
        }
    }

    return b;
}

const a = [
    [0,0,1,0,0],
    [0,1,1,1,0],
    [1,0,1,0,0],
    [1,0,0,0,0]
];

console.log(connectedComponentLabeling(a))
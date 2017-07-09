// ref: http://www.cnblogs.com/Rainlee007/p/6155543.html ;wikipedia two-pass

/**
 * Allocate connected components of an binary matrix
 * @param {Array} a binary matrix
 * @return {Array} different number denote different connectd components
 */

function connectedComponentLabeling(a) {
    const b = [];

    for (let i = 0; i < a.length; i++) {
        b[i] = [];
    }

    const labels = new UnionFind(10000);
    let label = 1;

    // First pass: if a[i][j] 不为0；左边，上边不存在或都为0，label 增加；否则选取较小的label，并记录较大 label 的 parent
    for (let i = 0; i < a.length; i++) {
        for (let j = 0; j < a[0].length; j++) {
            if (a[i][j] == 0) {
                b[i][j] = 0;

                // 当该像素的左邻像素和上邻像素为无效值时，给该像素置一个新的label值，label ++;
            } else if ((a[i - 1] == undefined || a[i - 1][j] == 0) && (a[i][j - 1] == undefined || a[i][j - 1] == 0)) {
                b[i][j] = label;
                label += 1;
                // 当该像素的左邻像素和上邻像素都为有效值时，选取其中较小的label值赋给该像素的label值

            } else if (a[i - 1] && a[i - 1][j] && a[i - 1][j] !== 0 && a[i][j - 1] && a[i][j - 1] !== 0) {
                const smallerLabel = Math.min(b[i - 1][j], b[i][j - 1]);
                const biggerLabel = Math.max(b[i - 1][j], b[i][j - 1]);
                b[i][j] = smallerLabel;
                labels.union(smallerLabel, biggerLabel);
            } else if (a[i - 1] && a[i - 1][j] !== 0) {
                b[i][j] = b[i - 1][j];
            } else if (a[i][j - 1] !== 0) {
                b[i][j] = b[i][j - 1];
            } else {
                throw new Error('unconsiderd condition')
            }
        }
    }

    // Second pass: find parent label
    for (let i = 0; i < a.length; i++) {
        for (let j = 0; j < a[0].length; j++) {
            if (b[i][j] !== 0) {
                b[i][j] = labels.find(b[i][j]);
            }
        }
    }

    return b;
}


// https://github.com/ZuchaoWang/union-find-js
class UnionFind {
    constructor(n) {
        this.parents = new Array(n);
        this.ranks = new Array(n);
        for (var i = 0; i < n; i++) {
            this.parents[i] = i;
            this.ranks[i] = 0;
        }
    }

    find(i) {
        var parents = this.parents,
            root = i;
        while (root !== parents[root]) {
            root = parents[root];
        }

        // path compression
        var cur = i;
        while (root !== parents[cur]) {
            cur = parents[cur];
            parents[cur] = root;
        }

        return root;
    }

    union(i, j) {
        var parents = this.parents,
            ranks = this.ranks,
            iroot = this.find(i),
            jroot = this.find(j);

        // union by rank
        if (ranks[iroot] < ranks[jroot]) {
            parents[iroot] = jroot;
        } else if (ranks[iroot] > ranks[jroot]) {
            parents[jroot] = iroot;
        } else {
            parents[jroot] = iroot;
            ranks[iroot]++;
        }
    }
}

module.exports = connectedComponentLabeling;
function createTree(d = 1) {
    function r(arr, d) {
        if (d === 1) {
            return arr;
        }

        return arr.map(e => {
            return {
                value: e.value,
                children: r(arr.filter(o => e.value !== o.value).map(e => ({...e})), d - 1)
            }
        });
    }

    return {
        children: r([
            {
                value: 0
            },
            {
                value: 1
            },
            {
                value: 2
            },
            {
                value: 3
            },
            {
                value: 4
            },
            {
                value: 5
            },
            {
                value: 6
            },
            {
                value: 7
            },
            {
                value: 8
            },
            {
                value: 9
            },
        ], d)
    };
}

function deleteNumberFromTree(target, tree) {
    if (tree.children) {
        tree.children = tree.children.filter(e => e.value !== target)
        tree.children.forEach(pt => deleteNumberFromTree(target, pt))
    }
}

/*
 -----------------------------------------------------------------------------------------------------------------------
 */

const tree = createTree(4);

deleteNumberFromTree(1, tree);

console.dir(tree, {
    depth: Number.POSITIVE_INFINITY
})
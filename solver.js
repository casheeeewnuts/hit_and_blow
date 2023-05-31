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

        if (tree.children.length === 0) {
            delete tree.children;
            return
        }

        tree.children.forEach(pt => deleteNumberFromTree(target, pt))
    }
}

function enumerateFromTree(tree) {
    if (!tree.children || tree.children.length === 0) {
        return [tree.value]
    }

    if (tree.value != null) {
        return tree.children.map(n => [tree.value, enumerateFromTree(n)]);
    }

    return tree.children.map(enumerateFromTree)
}
/*
 -----------------------------------------------------------------------------------------------------------------------
 */

const tree = createTree(4);

// deleteNumberFromTree(0, tree);
// deleteNumberFromTree(1, tree);
// deleteNumberFromTree(2, tree);
// deleteNumberFromTree(3, tree);
// deleteNumberFromTree(4, tree);
// deleteNumberFromTree(5, tree);
// deleteNumberFromTree(6, tree);
// deleteNumberFromTree(7, tree);
// deleteNumberFromTree(8, tree);
// deleteNumberFromTree(9, tree);

console.dir(enumerateFromTree(tree), {
    depth: Number.POSITIVE_INFINITY
})
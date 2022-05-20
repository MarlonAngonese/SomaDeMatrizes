// Copia uma matriz sem referenciar
const copyMatrix = (matrix) => {
    let matrix_copy = JSON.parse(JSON.stringify(matrix));

    return matrix_copy;
}

// Apresentar informações de uma matriz na tela
const presentResult = (j, number) => {
    if (j == 3) {
        result += `${number}\n`
    } else if (j == 0) {
        result += `${tab}${number}, `  
    } else {
        result += `${number}, `
    }
}

// Função para gerar matrizes aleatorias
const generateMatrix = (matrix) => {
    // i são as linhas e j são as colunas
    for (let i = 0; i <= 3; i++) {
        for (let j = 0; j <= 3; j++) {
            // Math.random * 255 gera um número aleatorio entre 0 e 255
            // Math.floor é uma forma de arredondar números para inteiro
            matrix[i][j] = Math.floor(Math.random() * 255)

            number = matrix[i][j]
            presentResult(j, number);
        }
    }

    return matrix
}

// Função para somar duas matrizes
const sumMatrix = (matrix1, matrix2) => {
    
    // Cria uma matriz com a mesma estrutura que matrix1
    let matrix_r = copyMatrix(matrix1);
    
    // i são as linhas e j são as colunas
    for (let i = 0; i <= 3; i++) {
        for (let j = 0; j <= 3; j++) {
            matrix_r[i][j] = matrix1[i][j] + matrix2[i][j];

            number = matrix_r[i][j];
            presentResult(j, number);
        }
    }

    return matrix_r;
}

// Função para Normalizar uma matriz
const normalizeMatrix = (matrix) => {
    //Busca pelo maior e menor número na matriz

    let maior = -510
    let menor = 510

    for (let i = 0; i <= 3; i++) {
        for (let j = 0; j <= 3; j++) {
            if (matrix[i][j] > maior) {
                maior = matrix[i][j]
            }

            if (matrix[i][j] < menor) {
                menor = matrix[i][j]
            }
        }
    }

    // Normaliza os elementos da matriz

    // Cria uma matriz com a mesma estrutura que matrix
    let matrix_norm = copyMatrix(matrix);
    
    // i são as linhas e j são as colunas
    for (let i = 0; i <= 3; i++) {
        for (let j = 0; j <= 3; j++) {
            let number = matrix[i][j];

            // Fórmula da Normalização e arredondamento do número
            number = Math.round((255 / (maior - menor)) * (number - menor))

            matrix_norm[i][j] = number;
            presentResult(j, number);
        }
    }

    return matrix_norm;
}

// Função para Truncar uma matriz
const truncateMatrix = (matrix) => {
    // Cria uma matriz com a mesma estrutura que matrix
    let matrix_t = copyMatrix(matrix);
    
    // i são as linhas e j são as colunas
    for (let i = 0; i <= 3; i++) {
        for (let j = 0; j <= 3; j++) {
            let number = matrix[i][j];
            
            if (number > 255) {
                number = 255;
            } else if (number < 0) {
                number = 0;
            }

            matrix_t[i][j] = number;
            presentResult(j, number);
        }
    }

    return matrix_t;
}

let textbox = $('#logbox-text')

// Cria as Matrizes X e Y vazias
let matrix_M = [
    [undefined, undefined, undefined, undefined],
    [undefined, undefined, undefined, undefined],
    [undefined, undefined, undefined, undefined],
    [undefined, undefined, undefined, undefined],
];

// Macete para evitar com que a matriz Y tenha refêrencia de X
let matrix_N = JSON.parse(JSON.stringify(matrix_M));

// Guarda o espaçamento em uma variavel
const tab = `      `;

// Imprime matriz de X enquanto gera a mesma
result = `Matriz Gerada Aleatóriamente M = [\n`
matrix_M = generateMatrix(matrix_M)
result += `]\n\n`

// Imprime matriz de X enquanto gera a mesma
result += `Matriz Gerada Aleatóriamente N = [\n`
matrix_N = generateMatrix(matrix_N)
result += `]\n\n`

// Calcular o Resultado Intermediário
result += `Resultado Intermediário R = [\n`
matrix_R = sumMatrix(matrix_M, matrix_N)
result += `]\n\n`

// Normalização do Resultado
result += `Normalização Norm = [\n`
matrix_Norm = normalizeMatrix(matrix_R)
result += `]\n\n`

// Truncamento do Resultado
result += `Truncamento T = [\n`
matrix_T = truncateMatrix(matrix_R)
result += `]\n\n`

result += `> Aperte F5 para gerar novas matrizes aleatórias X e Y`

textbox.append(result)
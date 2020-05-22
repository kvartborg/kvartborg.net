---
title: Vector
published: true
description: An experiment about finding a simpler way to express vector math in Go.
created: 2020-02-02 10:09
tags:
cover: linear-gradient(339deg, rgba(34,193,195,1) 0%, rgba(253,187,45,1) 100%)
menu-color: white
---

<style>
svg#vector-field {
  max-width: 500px;
}

p:only-of-type svg#vector-field {
  baground: red;
}

svg #winds {
  fill: var(--grey);
}

.dark svg #winds {
  fill: var(--lighter-dark);
}

svg #avg-winds {
  fill: var(--darker-blue);
}
</style>

In this post I will dive into vector math in Go and how I think we can improve
on existings solutions. The key areas i want to improve in this experiment is
regarding usability, readability and maintainability of doing vector math in Go.
The introduced changes maybe even improve on performance in some cases, see
[example](#example).

This post is based on my own experience working with vector math in Go. Its based
on the usage of thirdparty packages as well as homebrewed implementations.

I will draw some comparisons to [Gonum](https://github.com/gonum/gonum), because it
seems like the most adopted way of doing vector math in Go.
It is important to emphasis that this is not a rant on Gonum in any way.
It is about exploring an alternative approach to how vector math could be written
in Go.


### Why?
First of all why do we even need another solution when others already exist?
Let me try to explain with an example.

Through my experience working with different vector packages, one of
the major problems i found, is related to instantiation of vectors.
It has a tendcy to get cumbersome and hurts the readability of the code as it grows.

To prove my point i have written a simple example to demonstrate the problem in
practise. Lets start with defining the problem we want to solve before we look
at the code.


Lets say I have two vectors $$ a $$ and $$ b $$:
<center>
  $$ a = (1, 2) $$
  <span style="width:var(--spacing); display:inline-block"></span>  
  $$ b = (2, 4) $$
</center>

And I want to add them together to get the resulting vector $$ c $$:

$$ c = a + b $$

The solution to the problem in Gonum can be written as:

```go
c := mat.NewVecDense(2, nil)
a := mat.NewVecDense(2, []float64{1, 2})
b := mat.NewVecDense(2, []float64{2, 4})
c.AddVec(a, b)
```

As the example above shows that the resulting code is mostly vector instantiation
except the last line where the addition of the vectors actually is done.
I think this basic problem describes very well how vector instantiation can add
unnecessary noise to a codebase as it grows.

Another problem i have with the above example in Gonum is that it reads a bit
weird because the vector $$ c $$ has to be instantiated as a receiving vector
where the result of the `AddVec` operation can be stored.

So how can we do better? I propose a solution that can be expressed as the code
below:
```go
a := vec{1, 2}
b := vec{2, 4}
c := a.Add(b)
```

This is much shorter and removes a lot of noise around the instantiation of a vector.
As the example shows there are no need for a constructure functions because `vec`,
just is a concrete type, but more on that later.
Another benefit of the proposed solution is that it can be expressed on a single
line and is as close as we can get to the real mathematical expression with Go's
syntax.

$$ c = (1, 2) + (2, 4) $$

<center>
<pre><code class='language-go' style='background:transparent;font-size:.96em; padding-top:0px;'>c := vec{1, 2}.Add(vec{2, 4})</code></pre>
</center>



leveraging Go types


### What is a vector

> A vector is given by $$ n $$ coordinates and can be specified as $$ (A_1, A_2, ..., A_n) $$
  Vectors are sometimes referred to by the number of coordinates they have,
  so a 2-dimensional vector $$ (x_1,x_2) $$ is often called a two-vector,
  an $$ n $$-dimensional vector is often called an $$ n $$-vector. <br>
  \- [Wolfram](http://mathworld.wolfram.com/Vector.html)

There are basically two ways to represent a vector in Go, it can either be represented as a fixed sized dimensional vector or as an $$ n $$-dimensional vector.
I will go into the details benefits and tradeoffs of each way of representing vectors below. Lets start by looking at a specific sized dimensional vector, lets base
it on a 3 dimensional vector.
```go
type Vec3D struct { X, Y, Z float64 }
```


### Example



<center>

  ![vector field](/static/imgs/vector-field.svg)

</center>


$$
\begin{pmatrix}
  \vec{w}_1, \vec{w}_2, \dots, \vec{w}_n
\end{pmatrix}
$$

$$
\vec{r} = \vec{w}_1 + \vec{w}_2 + \dots + \vec{w}_n
$$

$$
\theta = \mathrm{atan2}(\vec{r}_2, \vec{r}_1)
$$

$$
v = \frac{\displaystyle\sum_{i=1}^n \begin{Vmatrix} \vec{w}_i \end{Vmatrix}} {n}
$$

$$
\vec{s} = \begin{pmatrix} v, 0 \end{pmatrix}
$$

$$
\vec{aw} = \begin{pmatrix}
  \vec{s}_1 * \cos{\theta} - \vec{s}_2 * \sin{\theta} \\\\
  \vec{s}_1 * \sin{\theta} + \vec{s}_2 * \cos{\theta}
\end{pmatrix}
$$

$$ \vec{aw} $$ is the calculated avarage wind

```go
func AverageWind(winds []*mat.VecDense) *mat.VecDense {
    // Find average direction of winds
    r := mat.NewVecDense(2, nil)
    for i := range winds {
        r.AddVec(r, winds[i])
    }
    direction := math.Atan2(r.AtVec(1), r.AtVec(0))

    // Find average speed of winds
    var speed float64
    for i := range winds {
        speed += mat.Norm(winds[i], 2)
    }
    speed /= len(winds)

    // Create vector with magnitude of average speed and rotate it in
    // the average direction
    s := mat.NewVecDense(2, []float64{speed, 0})
    cos, sin := math.Cos(direction), math.Sin(direction)

    return mat.NewVecDense(2, []float64{
        cos*s.AtVec(0) - sin*s.AtVec(1),
        sin*s.AtVec(0) + cos*s.AtVec(1),
    })
}
```

```go
func AverageWind(winds []vec) vec {
    // Find average direction of winds
    r := make(vec, 2).Add(winds...)
    direction := math.Atan2(r[1], r[0])

    // Find average speed of winds
    var speed float64
    for i := range winds {
        speed += winds[i].Magnitude()
    }
    speed /= len(winds)

    // Create vector with magnitude of average speed and rotate it in
    // the average direction
    return vec{speed}.Rotate(direction)
}
```




### Conclusion

### Credits
















> It is important to emphasis that all the work i present in this post are heavily
inspired by other packages that i have experience with, I have simply just taken
what worked and backed it into this package. It is basically a result of how i
think we should work with vectors.





Code containing mathematical expressions has tendency to get very verbose, hard to read and thereby hard to maintain over time.

There are other packages in the go community addressing issues like this, but with mixed resultes.
Its a hard problem to solve and there are no perfect solution, there will always be tradeoffs with different implementations.

It is problem that is hard to solve,
math expressions can not just be simplified, but an approach to resolve the
mentioned problems could be to take a subset of mathematical expressions and
create a package that can handle

There is really no good solution as of this writing that solves
the problem well i think. There are already a lot of vector packages done by other
developers on github, some are quite good and some are amazing like [`gonum`](https://github.com/gonum/gonum). But they all still have the tendency mentioned earlier and often they can get cumbersome to work with, especially gonum which can do a lot more than just vector math.

This post will explore how i think we can improve on existing solutions, to acheive a better and simpler way to write vector math.

> It is important to emphasis that this is still very experimental and the API will properly change. There are lots of other good packages tackling vector math as well.
I would suggest to take a look at [`gonum`](https://github.com/gonum/gonum) before consider using any of the code presented in this post.








<!-- The intend of this package is not to replace gonum in any way. Its an alternative way to handle vectors and vector arithmetic, which strives to have a concise api that reduces the overall
verbosity and thereby increase the readability of math expressions in Go.

This project contains internal code from the gonum project which enhances the performance of the following arithmetic operations: `addition`, `subtraction` and `scaling`. If you haven't already, give gonum a star on [GitHub](https://github.com/gonum/gonum) for the incredible work they are doing.

This article will only focus on the semantic of handling vectors and vector arithmetic in Go.
I will properly write a follow up that compare performance, memory usage and other tradeoffs of implementations tackling vector math.  -->



### Why?
To answer why i have started this experiment i first have to explain how i feel

There are


 - To ways to define vectors specific sized and $$ n $$-dimensional.
 - Specific sized arithmetic operations are fast, but different sized vectors each need to reimplement the arithmetic operations to fit their size.
 - $$ n $$-dimensional are generic in the way they can be any size and no extra code is needed, but their arithmetic operations are slower.









### Why?
To answer why i have started this experiment in the first place, we first have to
define what a vector is.

> A vector is given by $$ n $$ coordinates and can be specified as $$ (A_1, A_2, ..., A_n) $$
  Vectors are sometimes referred to by the number of coordinates they have,
  so a 2-dimensional vector $$ (x_1,x_2) $$ is often called a two-vector,
  an $$ n $$-dimensional vector is often called an $$ n $$-vector. <br>
  \- [Wolfram](http://mathworld.wolfram.com/Vector.html)

The naiv way that a vector could be represent in Go is by defining a struct type as
`Vector2D`. This vector represents a two-vector as defined by Wolfram.

```go
type Vector2D struct {
    x, y float64
}
```

This approach is very naiv and will not scale well because
the implementation have to change with different dimensions of vectors.
This is not feasable and in many cases will result redundant code supporting
vectors of different dimensions.

But it actually has an appealing use case, and thats related to performance.
Because the vector type is well defined, it can do arithmetic operations very fast
compared to other implementations. This is the reason why the solution
used at DanaDynamics as of this writing is based on a 3-dimensional vector type,
with the above mentioned limitations.

Those limitations are ultimatively what triggered the experiment,
there must be a solution that is still performant and syntactically close to
the existing solution used at DanaDynamics.

### Gonum to the rescue
Gonum is a great library that includes many useful numeric libraries, and in
most cases performs very well. But in the case of arithmetic operations on smaller
matrices or vectors it really isn't that fast (maybe its just me using it wrongly?).
Another drawback is that the usage of gonum can get very verbose real fast.
As can be seen in the simple example provided below.

$$ result = (1, 2, 3) + (3, 2, 1) $$

```go
// Create a receiving vector
result := mat.NewVecDense(3, nil)

// Create two new 3-dimensional vectors: (1,2,3), (3,2,1)
v1 := mat.NewVecDense(3, []float64{1, 2 ,3})
v2 := mat.NewVecDense(3, []float64{3, 2 ,1})

// result = (1,2,3) + (3,2,1)
result.AddVec(v1, v2)
```

I really like the idea behind gonum and support all the work that gets put into it.
But for the use case i'm after this is just way to much code to write to
achieve something as simple as the above example. And it just doesn't perform
good enough with smaller dimension vectors for the use cases we have at
DanaDynamics currently.

Compatebility

### The alternative approach

```go
type Vector []float64
```

![testing](/static/imgs/numpy-compare.svg)

### Tackling verbosity
Another goal of this experiment is to minimize the verbosity around using the package,
this can be acheived by using type aliasing. In this way you can omit the package
identifier and give the `Vector` a shorter name like `vec` or something else,
it is up to you.
```go
// Minimize the verbosity by using type aliasing
type vec = vector.Vector

// addition of two vectors
result := vec{1, 2}.Add(vec{2, 4})
```

A nice side effect of representing a vector as a list of `float64` values is that
we easily can turn a slice of `float64` into a vector by using type casting.
This elimitates the need for any constructor functions for the vector type.
```go
// Turn a list of floats into a vector
v := vec([]float64{1, 2, 3})
```

```go
// Turn a vec into a gonum VecDense
v := vec{1, 2}
gv := mat.NewVecDense(len(v), v)
```


### Example


<center>

  ![vector field](/static/imgs/vector-field.svg)

</center>


$$
\begin{pmatrix}
  \vec{w}_1, \vec{w}_2, \dots, \vec{w}_n
\end{pmatrix}
$$

$$
\vec{r} = \vec{w}_1 + \vec{w}_2 + \dots + \vec{w}_n
$$

$$
\theta = \mathrm{atan2}(\vec{r}_2, \vec{r}_1)
$$

$$
v = \frac{\displaystyle\sum_{i=1}^n \begin{Vmatrix} \vec{w}_i \end{Vmatrix}} {n}
$$

$$
\vec{s} = \begin{pmatrix} v, 0 \end{pmatrix}
$$

$$
\vec{aw} = \begin{pmatrix}
  \vec{s}_1 * \cos{\theta} - \vec{s}_2 * \sin{\theta} \\\\
  \vec{s}_1 * \sin{\theta} + \vec{s}_2 * \cos{\theta}
\end{pmatrix}
$$

$$ \vec{aw} $$ is the calculated avarage wind

```go
func AverageWind(winds []*mat.VecDense) *mat.VecDense {
    // Find average direction of winds
    r := mat.NewVecDense(2, nil)
    for i := range winds {
        r.AddVec(r, winds[i])
    }
    direction := math.Atan2(r.AtVec(1), r.AtVec(0))

    // Find average speed of winds
    var speed float64
    for i := range winds {
        speed += mat.Norm(winds[i], 2)
    }
    speed /= len(winds)

    // Create vector with magnitude of average speed and rotate it in
    // the average direction
    s := mat.NewVecDense(2, []float64{speed, 0})
    cos, sin := math.Cos(direction), math.Sin(direction)

    return mat.NewVecDense(2, []float64{
        cos*s.AtVec(0) - sin*s.AtVec(1),
        sin*s.AtVec(0) + cos*s.AtVec(1),
    })
}
```

```go
func AverageWind(winds []vec) vec {
    // Find average direction of winds
    r := make(vec, 2).Add(winds...)
    direction := math.Atan2(r[1], r[0])

    // Find average speed of winds
    var speed float64
    for i := range winds {
        speed += winds[i].Magnitude()
    }
    speed /= len(winds)

    // Create vector with magnitude of average speed and rotate it in
    // the average direction
    return vec{speed}.Rotate(direction)
}
```

### Conclusion


### Contribution
It is based on my own experience working with vector math in Go projects at DanaDynamics, and therefore the focus has been on operations that we use. Contributions with common operations that aren't included in this package yet are very welcome. So is comments/suggestions in the form of issues on [GitHub](https://github.com/kvartborg/vector).

### Credits
Thanks to [`gonum`](https://github.com/gonum/gonum) for inspiration and the following functions [`axpyUnitaryTo`](https://github.com/gonum/gonum/blob/master/internal/asm/f64/axpyunitaryto_amd64.s), [`scalUnitaryTo`](https://github.com/gonum/gonum/blob/c3867503e73e5c3fee7ab93e3c2c562eb2be8178/internal/asm/f64/scalunitaryto_amd64.s) that enhances the performance of arithmetic operations in this package.

Thanks to [@buggaarde](https://github.com/buggaarde), for input on this subject and for the implementation used at DanaDynamics at the time of this writing, its performance can properly not be beaten by an $$ n $$-dimensional approach, but we can get closer.
